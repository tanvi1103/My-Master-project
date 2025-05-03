
// controllers/nationalIDController.js
import NationalID from '../models/NationalID.js';
import { getNextSequence } from '../utils/counter.js';

export const createNationalID = async (req, res) => {
  const { firstName, middleName, lastName, gender} = req.body;
  // Create new national ID document
  if (!firstName || !middleName || !lastName || !gender){
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }
  try {
    // Generate the next national ID number
    const nationalIdNumber = await getNextSequence('nationalId');
    
    const existingID = await NationalID.findOne({ firstName, middleName, lastName, gender})
    if (existingID) {
      return res.status(400).json({
        success: false,
        message: 'National ID already exists for this person'
      });
    }
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

export const searchNationalIDs = async (req, res) => {
  try {
    // Extract query parameters
    const { gender, firstName, middleName, lastName } = req.query;
    
    // Build the search filter dynamically
    const filter = {};
    
    if (gender) filter.gender = { $regex: new RegExp(gender, 'i') };
    if (firstName) filter.firstName = { $regex: new RegExp(firstName, 'i') };
    if (middleName) filter.middleName = { $regex: new RegExp(middleName, 'i') };
    if (lastName) filter.lastName = { $regex: new RegExp(lastName, 'i') };
    
    // Execute the query
    const nationalIDs = await NationalID.find(filter);
    
    res.status(200).json({
      success: true,
      count: nationalIDs.length,
      data: nationalIDs
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};