import express from 'express';
import userModel from '../models/userModel.js'; // Adjust the import according to your file structure


const router = express.Router();
const client = new OAuth2Client(process.env.CLIENT_ID);
const upload = multer({dest : 'uploads/'})
const JWT_SECRET = process.env.JWT_SECRET || '8106629402';


router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ msg: 'Token is required', res: false });
        }
        console.log("client id" + process.env.CLIENT_ID)

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
            });
        }

        const {password, ...userObj} = user._doc;

        return res.json({
            user : userObj,
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
        if ( !email || !name || !password) {
            return res.json({
                msg: "Missing fields",
                res: false
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({
                msg: "Account exists, login",
                res: false
            });
        }

        // Rename and save image file
        if (image) {
            const newFileName = `${email}${path.extname(image.originalname)}`;
            const newPath = path.join('uploads/', newFileName);
            fs.renameSync(image.path, newPath); // Rename the file

            // Update the path to the new file location
            req.file.path = newPath;
        }

        //hashing pass
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await userModel.create({
            name,
            email,
            password : hashedPassword,
            login_type: 'default',
            profile_url: image ? req.file.path : null
        });

        // Exclude sensitive information from user object
        const { password: userPassword, google_token, ...userObject } = user._doc;

        return res.json({
            user: userObject,
            res: true
        });

    } catch (error) {
        console.error('Error ', error);
        return res.status(401).json({ msg: 'Error, try again later', res: false });
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

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                msg: "User doesn't exist",
                res: false
            });
        }

        if(!user.password){
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
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});







export default router;
