
// controllers/nationalIDController.js
import NationalID from '../models/NationalID.js';
import { getNextSequence } from '../utils/counter.js';

export const createNationalID = async (req, res) => {
  try {
    // Generate the next national ID number
    const nationalIdNumber = await getNextSequence('nationalId');
    
    // Create new national ID document
    const nationalID = new NationalID({
      ...req.body,
      nationalIdNumber
    });

    // Save to database
    await nationalID.save();

    res.status(201).json({
      success: true,
     nationalID
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};