import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String },
    age: { type: Number },
    medicalHistory: { type: String },
    image: { type: String }, // Image URL or path (can be used to store image URL or base64 data)
    bloodGroup: { type: String }, // New field for blood group
});

const User = mongoose.model('User', userSchema);

export default User;
