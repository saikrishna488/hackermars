import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import clientModel from '../models/clientModel.js';
import sendOtpEmail from '../essentials/nodeMail.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/clients/' })
const JWT_SECRET = process.env.JWT_SECRET || '8106629402';

router.post('/register', upload.single("image"), async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const image = req.file;

        // Validate input
        if (!email || !name || !password || !phone) {
            return res.json({
                msg: "Missing fields",
                res: false
            });
        }

        // Check if user already exists
        const existingUser = await clientModel.findOne({ email });
        if (existingUser) {
            return res.json({
                msg: "Account exists, login",
                res: false
            });
        }

        // Rename and save image file if uploaded
        let profileUrl = null;
        if (image) {
            const newFileName = `${email}${path.extname(image.originalname)}`;
            const newPath = path.join('uploads/clients/', newFileName);

            // Ensure directory exists
            if (!fs.existsSync('uploads/clients')) {
                fs.mkdirSync('uploads/clients', { recursive: true });
            }

            fs.renameSync(image.path, newPath); // Rename the file
            profileUrl = newPath;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Send OTP email
        try {
            await sendOtpEmail(email, otp);
        } catch (err) {
            console.error('Error sending OTP email', err);
            return res.status(500).json({
                msg: "Failed to send OTP. Please try again later.",
                res: false
            });
        }

        // Create new user
        const client = await clientModel.create({
            name,
            email,
            password: hashedPassword,
            otp,
            profile_url: profileUrl,
            phone,
            credits : 4
        });

        // Exclude sensitive information from user object
        const { password: userPassword, is_verified, otp: userOtp, ...clientObject } = client._doc;

        return res.json({
            client: clientObject,
            res: true
        });

    } catch (error) {
        console.error('Error ', error);

        // If file was uploaded but error occurs, delete the uploaded file
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            msg: 'Error occurred, please try again later',
            res: false
        });
    }
});


router.post('/otp', async (req, res) => {
    try {
        // Extract OTP from request body
        const { otp } = req.body;

        // Check if OTP was provided
        if (!otp) {
            return res.json({
                msg: "OTP not received",
                res: false
            });
        }

        // Find client by OTP
        const client = await clientModel.findOne({ otp });

        if (client) {
            // Set client as verified and save changes
            client.is_verified = true;
            await client.save();

            return res.json({
                msg: "Verified",
                res: true
            });
        } else {
            return res.json({
                msg: "Invalid OTP",
                res: false
            });
        }
    } catch (err) {
        console.error(err);
        return res.json({
            msg: "Error occurred",
            res: false
        });
    }
});



//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                msg: "Missing fields",
                res: false
            });
        }

        const client = await clientModel.findOne({ email });
        if (!client) {
            return res.json({
                msg: "User doesn't exist",
                res: false
            });
        }

        if (!client.password) {
            return res.json({
                msg: "Sign in using Google",
                res: false
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.json({
                msg: "Invalid password",
                res: false
            });
        }

        const token = jwt.sign(
            { id: client._id, email: client.email },
            JWT_SECRET,
            { expiresIn: '30d' } // Token expiry time
        );

        // Exclude sensitive information
        const { password: userPassword,otp,is_verified, ...clientObject } = client._doc;

        return res.json({ 
            client,
            token,
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


//jwt
router.post('/jwt', async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.json({
                msg: "Missing token",
                res: false
            });
        }

        // Verify and decode the JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        const { id, email } = decoded;

        // Find the user based on the email from the decoded token
        const client = await clientModel.findOne({ email });
        if (!client) {
            return res.json({
                msg: "User doesn't exist",
                res: false
            });
        }

        // Exclude the password from the response
        const { password: userPassword,otp,is_verified, ...clientObject } = client._doc;

        return res.json({
            client: clientObject,
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});







export default router;
