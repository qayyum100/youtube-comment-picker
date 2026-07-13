import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, Send, Youtube, Github } from 'lucide-react';

const contactReasons = [
  'Bug Report',
  'Feature Request',
  'Partnership / Advertising',
  'General Support',
  'Content / Blog Inquiry',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: contactReasons[0], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Please enter a message (at least 20 characters).';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // mailto fallback — opens the user's email client with pre-filled data
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    const subject = encodeURIComponent(`[${form.subject}] - YouTube Comment Picker Contact`);
    window.location.href = `mailto:support@youtubecommentpickerthumbnaildownload.online?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${hasError ? '#ef4444' : 'var(--border-light)'}`,
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  });

  return (
    <main style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Contact Us
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto' }}>
          We are a small, creator-focused team. We read every message personally and aim to respond within 24 hours on business days.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', alignItems: 'start' }}>

        {/* Left: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div className="liquid-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                <Mail size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Email Support</h3>
            </div>
            <a
              href="mailto:support@youtubecommentpickerthumbnaildownload.online"
              style={{ fontSize: '0.85rem', color: 'var(--glow-primary)', textDecoration: 'none', fontWeight: '500', wordBreak: 'break-all' }}
            >
              support@youtubecommentpicker<wbr />thumbnaildownload.online
            </a>
          </div>

          <div className="liquid-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <Clock size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Response Time</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We typically respond within <strong style={{ color: 'var(--text-primary)' }}>24 hours</strong> on weekdays. Weekend replies may take until Monday.
            </p>
          </div>

          <div className="liquid-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <Youtube size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Business Inquiries</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              For partnerships and advertising, select "Partnership / Advertising" in the form subject and include your channel or brand details.
            </p>
          </div>

          <div className="liquid-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                <MessageSquare size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>FAQ First</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Common questions about tools and giveaways are answered in our <a href="/blogs" style={{ color: 'var(--glow-primary)', textDecoration: 'none', fontWeight: '500' }}>Creator Guides</a>.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="liquid-glass" style={{ padding: '36px', borderRadius: 'var(--radius-xl)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={56} style={{ color: '#10b981', marginBottom: '20px' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Your email client is opening...
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                Your message has been pre-filled in your email app. Simply click Send to reach us. We'll reply within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: contactReasons[0], message: '' }); }}
                style={{ padding: '10px 24px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--border-light)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '500' }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                Send Us a Message
              </h2>

              {/* Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Your Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  style={inputStyle(!!errors.name)}
                  onFocus={e => e.target.style.borderColor = 'var(--glow-primary)'}
                  onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--border-light)'}
                />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: '6px 0 0 0' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle(!!errors.email)}
                  onFocus={e => e.target.style.borderColor = 'var(--glow-primary)'}
                  onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border-light)'}
                />
                {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: '6px 0 0 0' }}>{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  style={{ ...inputStyle(false), cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = 'var(--glow-primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                >
                  {contactReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Describe your question, bug, or request in detail. The more context you provide, the faster we can help."
                  rows={6}
                  style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: '140px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--glow-primary)'}
                  onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border-light)'}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {errors.message
                    ? <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{errors.message}</p>
                    : <span />}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{form.message.length} chars</span>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Send size={18} />
                Send Message
              </button>

              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                This will open your email client with the message pre-filled. We never store your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
