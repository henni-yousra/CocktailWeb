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


export { signup };
