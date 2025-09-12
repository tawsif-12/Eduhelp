// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

console.log('Starting server...');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;       // e.g. mongodb+srv://user:pass@cluster.x.mongodb.net/eduhelp
const DB_NAME   = process.env.MONGODB_DB || '';  // optional, e.g. 'eduhelp'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());

// ---------- Mongoose ----------
if (!MONGO_URI) {
  console.error('❌ Missing MONGODB_URI in .env');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connection.on('connected', () => {
  console.log(`✅ Connected to ${mongoose.connection.host}/${mongoose.connection.name}`);
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// ---------- User Model ----------
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hash:  { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model('User', UserSchema);

// ---------- Validation ----------
const Creds = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 chars'),
});

// ---------- Routes ----------
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/signup', async (req, res) => {
  const parse = Creds.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: parse.error.issues[0].message });

  const { email, password } = parse.data;

  const exists = await User.findOne({ email }).lean();
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, hash });

  const token = jwt.sign({ sub: user._id.toString(), email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { email } });
});

app.post('/api/auth/login', async (req, res) => {
  const parse = Creds.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: parse.error.issues[0].message });

  const { email, password } = parse.data;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { email: user.email } });
});


// Optional: quick debug route to verify DB & counts
app.get('/api/debug/db', async (_req, res) => {
  res.json({
    db: mongoose.connection.name,
    host: mongoose.connection.host,
    users: await User.countDocuments().catch(() => null),
  });
});

// Demo: Add a test user for login demo
app.post('/api/debug/add-test-user', async (_req, res) => {
  const email = 'demo@user.com';
  const password = 'demopass';
  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: 'Test user already exists', email });
  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, hash });
  res.json({ message: 'Test user created', email, password });
});

// ---------- Start Server (after DB connects) ----------
async function start() {
  try {
    await mongoose.connect(MONGO_URI, DB_NAME ? { dbName: DB_NAME } : {});
    await User.init(); // ensure unique index
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();
