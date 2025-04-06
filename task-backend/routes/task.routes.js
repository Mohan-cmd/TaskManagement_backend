const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');

router.post('/create', async (req, res) => {
  console.log('🟡 Incoming request:', req.body); // You should now see this
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error('🔥 Error creating task:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
