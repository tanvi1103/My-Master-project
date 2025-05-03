// utils/counter.js
import Counter from '../models/Counter.js';

export const getNextSequence = async (name) => {
  const ret = await Counter.findOneAndUpdate(
    { id: name },
    { $inc: { seq: 6435406521894617 } },
    { new: true, upsert: true }
  );
  return ret.seq;
};