/**
 * Diary Controller
 *
 * User-Specific Queries:
 * Every query filters by req.user.id (from JWT middleware) so users
 * can only access their own diary entries.
 *
 * Protected Resources:
 * All endpoints require a valid JWT. The auth middleware attaches
 * the decoded user to req.user before these functions run.
 */

const DiaryEntry = require('../models/DiaryEntry');

// GET /api/diary — get all entries for the authenticated user
async function getEntries(req, res) {
  try {
    const entries = await DiaryEntry.find({ userId: req.user.id }).sort({ date: -1, createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch diary entries' });
  }
}

// GET /api/diary/:date — get entries for a specific date
async function getEntriesByDate(req, res) {
  try {
    const entries = await DiaryEntry.find({
      userId: req.user.id,
      date: req.params.date,
    }).sort({ createdAt: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries for date' });
  }
}

// POST /api/diary — add a new diary entry
async function addEntry(req, res) {
  try {
    const { date, mealName, foodItem, calories } = req.body;

    if (!date || !mealName || !foodItem || !calories) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const entry = await DiaryEntry.create({
      userId: req.user.id,
      date,
      mealName,
      foodItem,
      calories: Number(calories),
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save diary entry' });
  }
}

// DELETE /api/diary/:id — remove a diary entry
async function removeEntry(req, res) {
  try {
    // User ownership: only delete if entry belongs to this user
    const entry = await DiaryEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ message: 'Entry removed', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove entry' });
  }
}

module.exports = { getEntries, getEntriesByDate, addEntry, removeEntry };
