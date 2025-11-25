import bcrypt from 'bcrypt';
import prisma from '../prisma.config.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwt.js';

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

    const token = generateToken({ id: user.id, email: user.email });

    const cookieOptions = {
      httpOnly: true,        
      secure: false,          
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 
    };

    res.cookie("token", token, cookieOptions);

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Logged in successfully",
      user: userWithoutPassword
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error logging in user",
      error: error.message
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,       // set to false on localhost
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error logging out",
      error: error.message
    });
  }
};
