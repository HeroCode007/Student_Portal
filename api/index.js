// api/index.js - Vercel Serverless Function (ES Module + Express 5 compatible)
import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection with caching for serverless
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using cached DB connection');
    return cachedDb;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    console.log('Creating new DB connection...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
    cachedDb = conn;
    console.log('MongoDB connected successfully');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

// ============== MODELS ==============
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, required: true },
  semester: { type: String, required: true },
  gpa: { type: Number, default: 0.0 },
  attendance: { type: Number, default: 0 },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  instructor: { type: String, required: true },
  schedule: [{ day: String, time: String }],
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
}, { timestamps: true });

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
}, { timestamps: true });

// Use existing models or create new ones
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);

// ============== ROUTES ==============

// Health check - no DB needed
app.get('/api', (req, res) => {
  res.json({
    message: 'Student Portal API',
    status: 'ok',
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'NOT SET'
  });
});

// Test DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    await connectDB();
    res.json({ message: 'Database connected successfully', status: 'ok' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Student Routes
app.get('/api/students/:rollNo', async (req, res) => {
  try {
    await connectDB();
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    await connectDB();
    const student = await Student.findOneAndUpdate(
      { rollNo: req.body.rollNo },
      req.body,
      { new: true, upsert: true }
    );
    res.json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/students/:rollNo', async (req, res) => {
  try {
    await connectDB();
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(400).json({ message: error.message });
  }
});

// Course Routes
app.get('/api/courses', async (req, res) => {
  try {
    await connectDB();
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/courses/student/:studentId', async (req, res) => {
  try {
    await connectDB();
    const courses = await Course.find({ studentId: req.params.studentId });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching student courses:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    await connectDB();
    const course = new Course(req.body);
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    await connectDB();
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await connectDB();
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: error.message });
  }
});

// Assignment Routes
app.get('/api/assignments', async (req, res) => {
  try {
    await connectDB();
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/assignments/student/:studentId', async (req, res) => {
  try {
    await connectDB();
    const assignments = await Assignment.find({ studentId: req.params.studentId });
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching student assignments:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/assignments', async (req, res) => {
  try {
    await connectDB();
    const assignment = new Assignment(req.body);
    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/assignments/:id', async (req, res) => {
  try {
    await connectDB();
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/assignments/:id', async (req, res) => {
  try {
    await connectDB();
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ message: error.message });
  }
});

// Export for Vercel (ES Module syntax)
export default app;