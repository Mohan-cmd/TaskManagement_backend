const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const Task = require('./models/task.model');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to DB and sync
db.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected...');
    return db.sync({ force: true }); // Force create tables on every run
  })
  .then(() => {
    console.log('✅ Tables created');

    // Now define routes AFTER DB sync
    app.post('/api/tasks/create', async (req, res) => {
      try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
      } catch (error) {
        console.error('❌ Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
      }
    });

    // Start server only after DB sync
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB Connection or Sync Error:', err);
  });
