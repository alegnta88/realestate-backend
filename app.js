import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});