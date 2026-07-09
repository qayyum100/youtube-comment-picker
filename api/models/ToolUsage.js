import mongoose from 'mongoose';

const toolUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  toolName: { type: String, required: true },
  usageDate: { type: Date, default: Date.now },
  ipAddress: { type: String }
});

const ToolUsage = mongoose.model('ToolUsage', toolUsageSchema);
export default ToolUsage;
