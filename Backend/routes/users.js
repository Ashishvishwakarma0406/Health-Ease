    import express from 'express';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import multer from 'multer';
    import User from '../models/userModel.js';
    import Appointment from '../models/Appointment.js';
    import Consultance from '../models/Consultation.js';
    import { jwtSecret } from '../config.js';
    import { authMiddleware } from './middleware.js';
    import Consult from '../models/Consultation.js';
    import AmbulanceRequest from '../models/Ambulance.js';

    const router = express.Router();
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    // Login route
    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).send({ message: 'Username and password are required' });
            }

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });
            res.status(200).send({ message: 'Login successful', token, username: user.username });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send({ message: 'Error logging in' });
        }
    });

    // Get user by username
    router.get('/:username', async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });

            if (!user) {
                
                return res.status(404).send({ message: 'User not found' });
            }

            res.status(200).send(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send({ message: 'Error fetching user' });
        }
    });

    // Update user
    router.put('/:username', upload.single('image'), async (req, res) => {
        try {
            const { username, dob, age, medicalHistory, bloodGroup } = req.body;
            let updateData = { username, dob, age, medicalHistory, bloodGroup };

            if (req.file) {
                const imageBase64 = req.file.buffer.toString('base64');
                updateData.image = imageBase64;
            }

            const updatedUser = await User.findOneAndUpdate(
                { username: req.params.username },
                updateData,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).send({ message: 'User not found' });
            }

            res.status(200).send(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send({ message: 'Error updating user' });
        }
    });

    // Book Appointment route (with user authentication)
    router.post('/appointments', authMiddleware, async (req, res) => {
        try {
            const { doctorId, doctorName, specialty, hospital, location, fees, patientName, email, phone, date, time } = req.body;
            if (!doctorName || !specialty ||!hospital || !location || !fees || !patientName || !email || !phone || !date || !time) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const userId = req.user.id;

            const appointment = new Appointment({
                userId,
                doctorId,
                doctorName,
                specialty,
                hospital,
                location,
                fees,
                patientName,
                email,
                phone,
                date,
                time,
            });

            await appointment.save();
            res.status(200).json({ message: 'Appointment booked successfully', appointment });
        } catch (error) {
            console.error('Error booking appointment:', error);
            res.status(500).json({ error: 'Error booking appointment' });
        }
    });

    // Get appointments for the logged-in user
    router.get('/appointments/:username', async (req, res) => {
        try {
            const { username } = req.params;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Fetch appointments using userId
        const appointments = await Appointment.find({ userId: user._id });

        res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            res.status(500).json({ message: 'Error fetching appointments.' });
        }
    });

    router.post('/book-appointment',authMiddleware, async (req, res) => {
        try {
        const { doctorId, name, email, location, doctorName, date, time, symptoms } = req.body;
        const userId = req.user.id;
        // Save the data into the database
        const newConsultation = new Consult({
            userId,
            doctorId,
            name,
            email,
            location,
            doctorName,
            date,
            time,
            symptoms,
        });
    
        await newConsultation.save();
        res.status(200).send({ message: 'Appointment booked successfully!' });
        } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error booking appointment.' });
        }
    });
    
    router.get('/virtual-appointments/:username', async (req, res) => {
        try {
            const { username } = req.params;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Fetch appointments using userId
        const appointments = await Consultance.find({ userId: user._id });

        res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            res.status(500).json({ message: 'Error fetching appointments.' });
        }
    });

    router.post("/ambulance", async (req, res) => {
        const { latitude, longitude, manualLocation } = req.body;
    
        try {
        // Save location to the database (assuming a MongoDB setup)
        const request = new AmbulanceRequest({
            latitude,
            longitude,
            manualLocation,
            requestedAt: new Date(),
        });
        await request.save();
        res.status(201).json({ message: "Ambulance request saved successfully" });
        } catch (error) {
        console.error("Error saving ambulance request:", error);
        res.status(500).json({ message: "Failed to save request" });
        }
    });

    export default router;
