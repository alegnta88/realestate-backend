import bcrypt from 'bcrypt';
import prisma from '../prisma.config.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      },
    });
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: userWithoutPassword 
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error registering user',
      error: error.message 
    });
  }
};