import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDB from './config/nationalIDdb.js';
import nationalIDRouter from './routes/nationalIDRoutes.js';
import Counter from './models/Counter.js';
dotenv.config()

const PORT =  process.env.PORT || 6000;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://172.20.144.1:3000",
      "https://bonga-university-graduate-document.onrender.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/national-ids', nationalIDRouter);


app.get ("/", (req, res) => {
  res.send("National id api running...")
})







// Initialize Counter
const initializeCounter = async () => {
  const existingCounter = await Counter.findOne({ id: 'nationalId' });
  if (!existingCounter) {
    await Counter.create({ id: 'nationalId', seq: 0 });
    console.log('Counter initialized for nationalId');
  }
};





app.listen(PORT, () => {
  connectDB();
  initializeCounter(); // Initialize the counter when the server starts
  console.log(`Server running on port http://localhost:${PORT}`);
});


