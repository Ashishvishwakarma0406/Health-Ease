import mongoose from "mongoose";
const consultationSchema = new mongoose.Schema({
  userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model
          required: true,
        },
        doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Doctor', // Reference to the Doctor model
          required: true,
        },
    name:  { type: String, required: true },
    email:  { type: String, required: true },
    location:  { type: String, required: true },
    doctorName:  { type: String, required: true },
    date:  { type: String, required: true },
    time:  { type: String, required: true },
    symptoms:  { type: String, required: true },
  });

const Consult = mongoose.model('Consult', consultationSchema);

export default Consult;