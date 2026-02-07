import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neuroplan';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    studentData: {
        name: String,
        university: String,
        course: String,
        semester: String,
        year: String,
        collegeStartTime: String,
        collegeEndTime: String,
        attendanceDays: [String],
        subjects: Array,
        preferences: Object
    }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) res.json(user.studentData);
        else res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/user', async (req, res) => {
    const { email, studentData } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            user.studentData = studentData;
            await user.save();
        } else {
            user = new User({ email, studentData });
            await user.save();
        }
        res.json(user.studentData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
