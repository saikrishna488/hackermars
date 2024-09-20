import express from 'express'
const router = express.Router();
import hackathonModel from '../models/hackathonModel.js';


router.post('/add', async (req, res) => {
    try {
        const {
            image_url,
            title,
            team_size,
            about,
            themes,
            judges,
            organizers,
            description,
            partners,
            prizes,
            date,
            mode,
            phone,
            email,
            fee,
            eligibility,
        } = req.body;

        // Validate that all required fields are provided
        if (!image_url || !title || !team_size || !about || !themes || !judges || !organizers || !description || !partners || !prizes || !date || !mode || !phone || !email || !fee || !eligibility) {
            return res.status(400).json({
                msg: "Fill all the fields",
                res: false
            });
        }

        // Create a new hackathon entry
        const hackathon = await hackathonModel.create({
            image_url,
            title,
            team_size,
            about,
            themes,
            judges,
            organizers,
            description,
            partners,
            prizes,
            date,
            mode,
            phone,
            email,
            fee,
            eligibility
        });

        // Respond with success
        return res.status(201).json({
            res: true,
            msg: "Hackathon added successfully",
            data: hackathon
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "An error occurred, please try again later",
            res: false
        });
    }
});


router.get('/show', async (req, res) => {
    try {
        // Await the promise to get the data
        const hackathons = await hackathonModel.find({});

        if (hackathons.length > 0) {
            return res.json({
                res: true,
                hackathons
            });
        } else {
            return res.json({
                res: true,
                message: "No hackathons found",
                hackathons: []
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "An error occurred, please try again later",
            res: false
        });
    }
});

router.get('/one', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                msg: "ID is required",
                res: false
            });
        }

        // If `id` is an ObjectId, uncomment the next line
        // const hackathon = await hackathonModel.findById(id);

        const hackathon = await hackathonModel.findOne({ _id: id });

        if (hackathon) {
            return res.json({
                res: true,
                hackathon
            });
        } else {
            return res.json({
                res: true,
                message: "No hackathon found"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "An error occurred, please try again later",
            res: false
        });
    }
});





export default router;