const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const taskRoutes = require('./routes/task.routes'); // ✅ Import routes

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Use task routes
app.use('/api/tasks', taskRoutes);

// Test DB connection
db.authenticate()
  .then(() => console.log('✅ PostgreSQL connected...'))
  .catch(err => console.error('❌ Error: ', err));

db.sync().then(() => {
  console.log('✅ DB Synced');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
