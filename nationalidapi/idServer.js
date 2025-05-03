import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';




import connectDB from './config/nationalIDdb.js';
dotenv.config()

const PORT =  process.env.PORT || 6000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.get ("/", (req, res) => {
  res.send("National id api running...")
})












app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});