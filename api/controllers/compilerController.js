/**
 * Java Online Compiler Controller
 * Compiles and runs Java code.
 * - Uses local JDK if available (local development).
 * - Automatically falls back to Paiza API if javac/java binaries are not found (e.g., Vercel serverless environment).
 */

import { exec } from 'child_process';
import { promises as fs, existsSync } from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

// ── Resolve JDK paths ───────────────────────────────────────────────────────
function getJavaPaths() {
  const javaHome =
    process.env.JAVA_HOME ||
    'C:\\Users\\Razac\\.jdks\\openjdk-26.0.2';

  const isWin = process.platform === 'win32';
  const ext   = isWin ? '.exe' : '';

  const javacPath = path.join(javaHome, 'bin', `javac${ext}`);
  const javaPath  = path.join(javaHome, 'bin', `java${ext}`);

  if (existsSync(javacPath) && existsSync(javaPath)) {
    return { javac: javacPath, java: javaPath, isLocalAvailable: true };
  }
  return { javac: 'javac', java: 'java', isLocalAvailable: false };
}

function extractClassName(code) {
  const match = code.match(/public\s+class\s+(\w+)/);
  return match ? match[1] : 'Main';
}

function sanitizeError(text, tmpDir) {
  if (!text) return text;
  const normalizedTmpDir = tmpDir.replace(/\\/g, '[/\\\\]');
  const reg = new RegExp(normalizedTmpDir + '[/\\\\]?', 'gi');
  return text.replace(reg, '');
}

// ── Paiza.io Cloud Fallback Execution ───────────────────────────────────────
async function runOnPaiza(code, stdin) {
  const createRes = await fetch('https://api.paiza.io/runners/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: 'java',
      source_code: code,
      input: stdin,
      api_key: 'guest',
    }),
  });

  if (!createRes.ok) {
    throw new Error('Cloud compilation service unavailable. Please try again.');
  }

  const createData = await createRes.json();
  if (createData.error) {
    throw new Error(createData.error);
  }

  const id = createData.id;

  // Poll for completion (up to 10 seconds)
  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const detailsRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`);
    if (!detailsRes.ok) continue;

    const details = await detailsRes.json();
    if (details.status === 'completed') {
      const isCompileError = details.build_result === 'failure' || (details.build_exit_code && details.build_exit_code !== 0);
      const isRuntimeError = details.result === 'failure' || (details.exit_code && details.exit_code !== 0);

      let status = 'success';
      if (isCompileError) status = 'compile_error';
      else if (isRuntimeError) status = 'runtime_error';

      const compileOutput = (details.build_stdout || '') + '\n' + (details.build_stderr || '');
      const stdout = details.stdout || '';
      const stderr = details.stderr || '';

      return {
        status,
        compileOutput: compileOutput.trim(),
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode: details.exit_code ?? details.build_exit_code ?? 0,
        language: 'java',
        version: 'latest',
        runTimeMs: Math.round((parseFloat(details.time || '0')) * 1000),
      };
    }
  }

  throw new Error('Execution timed out.');
}

export async function compileJava(req, res) {
  const { code, stdin = '' } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'No code provided.' });
  }
  if (code.length > 100_000) {
    return res.status(400).json({ error: 'Code exceeds maximum length of 100,000 characters.' });
  }

  const { javac, java, isLocalAvailable } = getJavaPaths();

  // If local JDK is not available (e.g. deployed on Vercel), use cloud executor
  if (!isLocalAvailable) {
    try {
      const paizaResult = await runOnPaiza(code, stdin);
      return res.json(paizaResult);
    } catch (err) {
      console.error('Cloud compiler fallback error:', err);
      return res.status(500).json({ error: err.message || 'Compilation failed.' });
    }
  }

  // Local JDK execution
  const className = extractClassName(code);
  const tmpDir    = await fs.mkdtemp(path.join(os.tmpdir(), 'java-compiler-'));
  const srcFile   = path.join(tmpDir, `${className}.java`);

  try {
    await fs.writeFile(srcFile, code, 'utf-8');

    let compileError = '';
    const compileStart = Date.now();

    try {
      const { stderr } = await execAsync(`"${javac}" "${srcFile}"`, { timeout: 15_000, cwd: tmpDir });
      compileError = stderr;
    } catch (err) {
      compileError = err.stderr || err.message || 'Compilation failed';
      const cleanErr = sanitizeError(compileError, tmpDir);
      await cleanup(tmpDir);
      return res.json({
        status:        'compile_error',
        compileOutput: cleanErr.trim(),
        stdout:        '',
        stderr:        cleanErr.trim(),
        exitCode:      1,
        language:      'java',
        version:       '26',
        compileTimeMs: Date.now() - compileStart,
      });
    }

    const runStart = Date.now();
    let stdout = '', stderr = '', runExitCode = 0;

    try {
      const result = await execAsync(`"${java}" -cp "${tmpDir}" ${className}`, {
        timeout: 10_000,
        cwd: tmpDir,
        input: stdin,
        maxBuffer: 1024 * 1024,
      });
      stdout = result.stdout || '';
      stderr = result.stderr || '';
    } catch (err) {
      stdout      = err.stdout || '';
      stderr      = err.stderr || err.message || 'Runtime error';
      runExitCode = err.code   || 1;

      await cleanup(tmpDir);
      return res.json({
        status:        'runtime_error',
        compileOutput: compileError.trim(),
        stdout:        stdout.trim(),
        stderr:        stderr.trim(),
        exitCode:      runExitCode,
        language:      'java',
        version:       '26',
        runTimeMs:     Date.now() - runStart,
      });
    }

    await cleanup(tmpDir);
    return res.json({
      status:        'success',
      compileOutput: compileError.trim(),
      stdout:        stdout.trim(),
      stderr:        stderr.trim(),
      exitCode:      0,
      language:      'java',
      version:       '26',
      runTimeMs:     Date.now() - runStart,
    });

  } catch (err) {
    console.error('compileJava local error:', err);
    await cleanup(tmpDir);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}

async function cleanup(dir) {
  try { await fs.rm(dir, { recursive: true, force: true }); } catch (_) {}
}

