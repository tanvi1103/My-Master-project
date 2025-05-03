import mongoose from "mongoose";
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const nationalIDSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: {
    type: String,
    required: true,
    default: Date.now() - 22 * 365 * 24 * 60 * 60 * 1000, // Default to 22 years ago
  },
  gender: { type: String, required: true },
  phone_no: {type: String, required: true, default: "+251954233154", },
  country: { type: String, required: true, default: "Ethiopia" },
  region: {
    type: String,
    required: true,
    default: () => getRandom(["South West", "Oromia", "Amhara", "Tigray", "Sidama"])
  },
  city: {
    type: String,
    required: true,
    default: () => getRandom(["Bonga", "Jimma", "Addis Ababa", "Hawassa", "Dire Dawa"])
  },
  zone: {
    type: String,
    required: true,
    default: () => getRandom(["Kafa", "Jimma", "Gamo", "Bale", "Shewa"])
  },
  woreda: {
    type: String,
    required: true,
    default: () => getRandom(["Gesha", "Yeki", "Bita", "Shebe", "Dedo"])
  },
  kebele: {
    type: String,
    required: true,
    default: () => getRandom(["01", "02", "03", "04", "05", "06", "07"])
  },
  nationalIdNumber: { type: Number, unique: true },
  photo: {
    type: String,
    default: () => {
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const id = Math.floor(Math.random() * 100);
      return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
    }
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NationalID", nationalIDSchema);
