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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({ 
      message: 'User logged in successfully', 
      user: userWithoutPassword 
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error logging in user',
      error: error.message 
    });
  }
};