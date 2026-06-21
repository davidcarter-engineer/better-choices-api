/**
 * DiaryEntry Model
 *
 * User Ownership:
 * Each diary entry belongs to a specific user via userId.
 * Entries are organized by date so both web and mobile can
 * query entries for a specific day.
 *
 * Protected Resource:
 * Only the authenticated user can read/write their own entries.
 */

const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  mealName: { type: String, required: true },
  foodItem: { type: String, required: true },
  calories: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Compound index for efficient user+date queries
diaryEntrySchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);
