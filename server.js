const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// 1. Static Files (HTML, CSS, JS, Images) Serve Karein
app.use(express.static(path.join(__dirname, 'public')));

// 2. Explicit Page Routes (Fixes 'Cannot GET /gallery.html')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/gallery.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

app.get('/pricing.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pricing.html'));
});

app.get('/submit.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

// 3. Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solardraft_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to SolarDraft Database'))
    .catch(err => console.error('❌ Database connection error:', err));

// 4. Schema & API Route
const projectSchema = new mongoose.Schema({
    clientName: String,
    siteAddress: String,
    preferredSoftware: String,
    projectNotes: String,
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({ message: 'Project submitted!', projectId: newProject._id });
    } catch (error) {
        res.status(500).json({ message: 'Error saving project data.' });
    }
});

// 5. Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 SolarDraft Server running live on http://localhost:${PORT}`);
});
