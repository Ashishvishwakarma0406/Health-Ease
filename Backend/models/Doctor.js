import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Doctor's name
  specialty: { type: String, required: true },  // Doctor's specialty
  fees: { type: Number, required: true },  // Fees charged by the doctor
  hospital: { type: String, required: true },  // Hospital where the doctor works
  image: { type: String, required: true }, // Image URL of the doctor
  location: { type: String, required: true }, // Location of the doctor
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
