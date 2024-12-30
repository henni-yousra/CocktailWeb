import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';



// Handle Signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Create new user
    const newUser = new User({ email,  password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send success response
    res.status(201).json({ message: 'User created successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Login route (new)
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET, // Ensure you have a JWT secret in your .env file
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
};



export { signup, login};
