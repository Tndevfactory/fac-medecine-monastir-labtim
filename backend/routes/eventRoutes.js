// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
// IMPORTANT: Load models from the centralized models/index.js via the 'db' object
const db = require('../models'); // Corrected import path
const Event = db.Event; // Access Event model from the db object
const User = db.User;   // Access User model from the db object (for extendExpiration)


// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'DESC']] });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching single event:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// @desc    Create event
// @route   POST /api/events
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { title, description, date, location, image, category } = req.body;
    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      image,
      category,
      userId: req.user.id, // Assuming event can be linked to a user
    });
    // Optionally extend user's expiration date upon creating an event
    if (req.user.id) {
      await User.extendExpiration(req.user.id);
    }
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ success: false, message: error.message || 'Invalid data' });
  }
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
        
    event = await event.update(req.body);
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ success: false, message: error.message || 'Invalid data' });
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    await event.destroy();
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
