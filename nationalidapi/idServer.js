import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDB from './config/nationalIDdb.js';
import nationalIDRouter from './routes/nationalIDRoutes.js';
dotenv.config()

const PORT =  process.env.PORT || 6000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/national-ids', nationalIDRouter);


app.get ("/", (req, res) => {
  res.send("National id api running...")
})












app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});


// MONGODB_NATIONAL_ID_URI=mongodb+srv://madishamadiso00:6Yxq5O9YKtEm6Iks@cluster0.s4fepks.mongodb.net/nationalIdInfo?retryWrites=true&w=majority&appName=Cluster0

// PORT=7000

// JWT_SECRET=madishamadiso00

// CLIENT_URL=http://localhost:5173