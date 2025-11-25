import bcrypt from 'bcrypt';
import prisma from '../prisma.config.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      
      data: {
        username, email, password: hashedPassword
      },
    });
    console.log('User registered:', newUser);
    
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};