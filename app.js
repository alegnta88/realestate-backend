import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});