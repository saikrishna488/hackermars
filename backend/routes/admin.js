import express from 'express';
import adminModel from '../models/adminModel.js'
import userModel from '../models/userModel.js';
const router = express.Router();


//login
router.post('/login', async (req, res) => {
    try {
        const { key } = req.body;

        if (!key) {

            return res.json({
                msg: "Missing fields",
                res: false
            });
        }

        const admin = await adminModel.findOne({ key });

        if (!admin) {
            return res.json({
                msg: "Admin doesn't exist",
                res: false
            });
        }

        return res.json({
            msg : "Authenticated",
            admin,
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


//jwt
router.post('/add', async (req, res) => {
    try {
        const { key ,name ,isSuperAdmin , hasUsersAccess, hasHackathonsAccess, canWrite } = req.body;

        if (!key || !name || !isSuperAdmin || !hasUsersAccess || !hasHackathonsAccess || !canWrite) {
            return res.json({
                msg: "Missing token",
                res: false
            });
        }

        const admin = await adminModel.create({
            name,
            key,
            isSuperAdmin,
            hasUsersAccess,
            hasHackathonsAccess,
            canWrite
        })


        if (!admin) {
            return res.json({
                msg: "User doesn't exist",
                res: false,
            });
        }

        return res.json({
            msg : "Authenticated",
            res: true,
            admin
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


//fetch user
router.post('/user', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {

            return res.json({
                msg: "Missing email",
                res: false
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                msg: "user doesn't exist",
                res: false
            });
        }

        return res.json({
            msg : "fetched",
            user,
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


//fetch user
router.post('/userupdate', async (req, res) => {
    try {
        const { name, email,phone, aadhar, organization,organization_id, login_type, profile_url,
            is_verified,request_status,reason
         } = req.body;

        if (!email || !name || !login_type || !organization) {

            return res.json({
                msg: "Missing Fields",
                res: false
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                msg: "user doesn't exist",
                res: false
            });
        }

        user.name = name
        user.email = email
        user.login_type = login_type
        user.is_verified = is_verified
        user.phone = phone || null
        user.aadhar = aadhar || null
        user.organization = organization ||null
        user.organization_id = organization_id || null
        user.reason = reason || null
        user.profile_url = profile_url || null
        user.request_status = request_status || null

        await user.save()

        return res.json({
            msg : "update successful",
            user,
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


router.post('/userdelete', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {

            return res.json({
                msg: "Missing email",
                res: false
            });
        }

        const user = await userModel.findOneAndDelete({ email });

        if (!user) {
            return res.json({
                msg: "user doesn't exist",
                res: false
            });
        }

        return res.json({
            msg : "User Deleted Successfully",
            res: true
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});



//requests endpoint
router.get('/userrequests', async (req, res) => {
    try {
        const requests = await userModel.find({ request_status: "pending" });

        if (requests.length === 0) {
            return res.status(404).json({
                msg: "No requests found",
                res: false 
            });
        }

        return res.status(200).json({
            msg: "Requests found",
            res: true, 
            requests
        });

    } catch (error) {
        console.error('Error fetching user requests:', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});

router.post('/verifyuser', async (req, res) => {
    try {
        
        const {email , task} = req.body
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                res: false 
            });
        }

        if(task == "approve"){
            user.request_status = "verified"
        }
        else if(task == "reject"){
            user.request_status = "rejected"
        }
        
        await user.save()

        return res.status(200).json({
            msg: "Updated",
            res: true, 
            user
        });

    } catch (error) {
        console.error('Error fetching user requests:', error);
        return res.status(500).json({ msg: 'Error, try again later', res: false });
    }
});


export default router;



