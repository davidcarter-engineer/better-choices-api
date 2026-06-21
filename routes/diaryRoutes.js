/**
 * Diary Routes
 *
 * All routes require JWT authentication.
 * Each user can only access their own diary entries.
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getEntries, getEntriesByDate, addEntry, removeEntry } = require('../controllers/diaryController');

router.get('/', auth, getEntries);
router.get('/:date', auth, getEntriesByDate);
router.post('/', auth, addEntry);
router.delete('/:id', auth, removeEntry);

module.exports = router;
