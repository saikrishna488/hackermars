import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import userModel from '../models/userModel.js';
import otpModel from '../models/otpModel.js';
import multer from 'multer';
import bcrypt from 'bcrypt';
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { sendOtpEmail } from '../essentials/nodeMail.js';


const router = express.Router();
const client = new OAuth2Client(process.env.CLIENT_ID);
const upload = multer({ dest: 'uploads/' })
const JWT_SECRET = process.env.JWT_SECRET || '8106629402';


router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;

        console.log(process.env.CLIENT_ID)

        if (!token) {
            return res.status(400).json({ msg: 'Token is required', res: false });
        }

        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });


        if (!ticket) {
            return res.status(400).json({ msg: 'Invalid token', res: false });
        }

        // Get user information from the token
        const payload = ticket.getPayload();
        const userId = payload.sub; // User ID
        const email = payload.email; // User email
        const name = payload.name;
        const profile_url = payload.picture; // Use 'picture' instead of 'profile'

        // Check if user already exists
        let user = await userModel.findOne({ email });

        if (!user) {
            // Create a new user if they don't exist
            user = await userModel.create({
                name,
                email,
                profile_url,
                login_type: "google",
                google_token: token,
                is_verified: true
            });
        }

        const { password, ...userObj } = user._doc;

        return res.json({
            user: userObj,
            res: true,
        });

    } catch (error) {
        console.error('Error verifying token', error);
        return res.status(401).json({ msg: 'Invalid token', res: false });
    }
});




router.post('/register', upload.single("image"), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const image = req.file;

        // Validate input
        if (!email || !name || !password) {
            return res.json({
                msg: "Missing fields",
                res: false
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        // If the user exists and is verified, prompt to login
        if (existingUser && existingUser.is_verified) {
            return res.json({
                msg: "Account exists, login",
                res: false
            });
        }

        // If user exists but is not verified, resend OTP
        if (existingUser && !existingUser.is_verified) {
            // Generate a new OTP
            const otp = Math.floor(100000 + Math.random() * 900000);

            // Update or create OTP record in otpModel
            await otpModel.findOneAndUpdate(
                { email },  // Find OTP by email
                { otp },    // Set new OTP
                { upsert: true, new: true } // Create a new record if none exists
            );

            // Send OTP again
            await sendOtpEmail(email, otp);

            // Exclude sensitive information from user object
            const { password: userPassword, google_token, ...userObject } = existingUser._doc;

            return res.json({
                msg: "Account exists but not verified. OTP sent again.",
                user: userObject,
                res: true
            });
        }

        // Rename and save image file if it's provided
        if (image) {
            const newFileName = `${email}${path.extname(image.originalname)}`;
            const newPath = path.join('uploads/', newFileName);

            // Use async rename function for non-blocking I/O
            await fs.promises.rename(image.path, newPath);

            // Update the path to the new file location
            req.file.path = newPath;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            login_type: 'default',
            profile_url: image ? req.file.path : null
        });

        // Exclude sensitive information from user object
        const { password: newUserPassword, google_token, ...userObject } = newUser._doc;

        // Generate a 5-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Store OTP in the database
        await otpModel.create({ email, otp });

        // Send OTP via email
        await sendOtpEmail(email, otp); // Ensure sendOtpEmail is an async function

        return res.json({
            user: userObject,
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});



//otp
router.post('/otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        if (!otp || !email) {
            return res.json({
                msg: "Enter otp and email",
                res: false
            });
        }

        const verify = await otpModel.findOne({ otp, email });

        if (!verify) { // Corrected condition
            return res.json({
                msg: "Invalid otp",
                res: false
            });
        }

        // Delete OTP after verification
        await otpModel.deleteOne({ otp })

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                msg: "User not found",
                res: false
            });
        }

        user.is_verified = true;
        await user.save();

        return res.json({
            msg: "OTP verified",
            res: true
        });

    } catch (err) {
        console.log(err);
        return res.json({
            msg: "Server error",
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

        const user = await userModel.findOne({ email, is_verified: true });
        if (!user) {
            return res.json({
                msg: "User doesn't exist",
                res: false
            });
        }

        if (!user.password) {
            return res.json({
                msg: "Sign in using Google",
                res: false
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                msg: "Invalid password",
                res: false
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '30d' } // Token expiry time
        );

        // Exclude sensitive information
        const { password: userPassword, ...userObject } = user._doc;

        return res.json({
            user: userObject,
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
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                msg: "User doesn't exist",
                res: false
            });
        }

        // Exclude the password from the response
        const { password: userPassword, ...userObject } = user._doc;

        return res.json({
            user: userObject,
            res: true
        });

    } catch (error) {
        console.error('token Error',);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


router.post('/appeal', async (req, res) => {
    try {

        const { organization, organization_id, phone, reason, email } = req.body
        console.log(req.body)

        if (!organization || !phone || !reason) {
            return res.json({
                msg: "Provide All details",
                res: false
            })
        }

        const user = await userModel.findOne({ email })

        if (user.request_status == "pending" || user.request_status == "verified") {
            throw new Error("User Has already sent Request")
        }

        user.phone = phone
        user.organization = organization
        user.organization_id = organization_id || null
        user.reason = reason
        user.request_status = "pending"

        await user.save();

        const { password: newUserPassword, google_token, ...userObject } = user._doc;

        return res.json({
            msg: "Application sent wait for approval",
            res: true,
            user: userObject
        })

    }
    catch (err) {
        console.log(err)

        return res.json({
            msg: "Server Error",
            res: false
        })
    }
})


// mark as read
router.post('/markasread', async (req, res) => {
    try {
        const { id, userId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                msg: "User not found",
                res: false
            })
        }

        const notification = user.notifications.find(notification => notification._id == id);

        if (!notification) {
            return res.json({
                msg: "Notification not found",
                res: false
            })
        }

        notification.isRead = true;

        await user.save();

        const { password: newUserPassword, google_token, ...userObject } = user._doc;

        return res.json({
            msg: "Marked as read",
            res: true,
            user: userObject
        })

    }
    catch (err) {
        console.log(err)

        return res.json({
            msg: "Server Error",
            res: false
        })
    }
})


router.post('/upload-profile', upload.single('image'), async (req, res) => {

    try {

        const image = req.file;
        const { userId } = req.body;

        console.log(req.file, userId)

        if (!userId || !image) {
            return res.json({
                msg: "User not found",
                res: false
            })
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({
                msg: "User not found...",
                res: false
            })
        }

        const newFileName = `${user.email}${path.extname(image.originalname)}`;
        const newPath = path.join('uploads/', newFileName);

        // Use async rename function for non-blocking I/O
        await fs.promises.rename(image.path, newPath);

        // Update the path to the new file location
        req.file.path = newPath;

        user.profile_url = req.file.path;

        await user.save();

        const { password: newUserPassword, google_token, ...userObject } = user._doc;

        return res.json({
            msg: "Profile Image Updated",
            res: true,
            user: userObject
        })

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});



//update profile
router.post('/update-profile', async (req, res) => {
    try {

        const { oldpassword, newpassword, userId, name } = req.body;
        

        if (!name || !userId) {
            return res.json({
                msg: "Provide all details",
                res: false
            })
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                msg: "User not found",
                res: false
            })
        }

        if (oldpassword && newpassword) {


            if(oldpassword === newpassword){

                return res.json({
                    msg: "Old and New Passwords are same",
                    res: false
                })

            }

            console.log(oldpassword, newpassword)


            const isMatch = await bcrypt.compare(oldpassword, user.password);
            if (!isMatch) {
                return res.json({
                    msg: "Invalid Password",
                    res: false
                })
            }

            const hashedPassword = await bcrypt.hash(newpassword, 10);
            user.password = hashedPassword;
        }

        user.name = name;

        await user.save();

        return res.json({
            msg: "Profile Updated",
            res: true
        })

    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            msg: "server error",
            res: false
        })
    }
})


router.post('/send-otp', async (req,res)=>{

    try{

        const {email} = req.body;

        if(!email){
            return res.json({
                msg: "Email is required",
                res: false
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                msg: "User not found",
                res: false
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await otpModel.findOneAndUpdate(
            {email},
            {otp},
            {upsert: true, new: true}
        )

        await sendOtpEmail(email, otp);

        return res.json({
            msg: "OTP sent to your email",
            res: true
        })

    }
    catch(err){
        console.log(err)
        return res.json({
            msg: "Server Error",
            res: false
        })
    }
})


router.post('/verify-otp', async (req,res)=>{

    try{

        const {email, otp, newPassword} = req.body;

        if(!email || !otp || !newPassword){
            return res.json({
                msg: "Enter all details",
                res: false
            })
        }

        const verify = await otpModel.findOne({email, otp});

        if(!verify){
            return res.json({
                msg: "Invalid OTP",
                res: false
            })
        }

        await otpModel.deleteOne({otp});

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                msg: "User not found",
                res: false
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return res.json({
            msg: "Password reset successfully",
            res: true
        })

    }
    catch(err){
        console.log(err)
        return res.json({
            msg: "Server Error",
            res: false
        })
    }
})






export default router;
