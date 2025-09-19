const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const ADMIN_EMAIL = 'irfan.cse.20230104064@aust.edu';
const ADMIN_PASSWORD = 'admin123';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('Admin user already exists.');
      process.exit();
    }
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = new User({
      name: 'Admin',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      profile: { bio: 'Platform administrator' }
    });
    await admin.save();
    console.log('Admin user created!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
