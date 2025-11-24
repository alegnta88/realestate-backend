import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username, email, hashedPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};