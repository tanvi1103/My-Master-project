import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true }, // e.g., "nationalId"
  seq: { type: Number, default: 6435406521894617 } // starting national ID number
});

const Counter  = mongoose.model('Counter', counterSchema);

export default Counter;
