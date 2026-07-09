import mongoose from 'mongoose';

const savedReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportType: { type: String, required: true }, // 'seo-check', 'channel-analysis', etc.
  reportData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SavedReport = mongoose.model('SavedReport', savedReportSchema);
export default SavedReport;
