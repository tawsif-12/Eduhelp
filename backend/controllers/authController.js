
// Auth controller for handling login and registration
import users from '../modals/userModal.js';

export function register(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists.' });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role,
    joinedDate: new Date().toISOString().split('T')[0],
    coursesEnrolled: 0,
    coursesCompleted: 0,
    badges: ['New Member']
  };
  users.push(newUser);
  const { password: _, ...userData } = newUser;
  res.json(userData);
}

export function login(req, res) {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const { password: _, ...userData } = user;
  res.json(userData);
}
