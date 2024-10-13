import express from 'express'
const router = express.Router();
import hackathonModel from '../models/hackathonModel.js';
import multer from 'multer';



const upload = multer({ dest: 'uploads/hackathons' });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const {
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
            start_time,
            end_time,
            conducted_by,
            max_users,
            isPrivate,
            client_id,
            _id
        } = req.body;

        const image = req.file;

        // Validate that all required fields are provided
        if (!title || !team_size || !about || !themes || !judges || !organizers || !description || !partners || !prizes || !date || !mode || !phone || !email || !eligibility || !start_time || !end_time || !conducted_by || !max_users || !image || !isPrivate || !client_id) {
            return res.status(400).json({
                msg: "Fill all the fields",
                res: false
            });
        }

        console.log(_id)

        if(_id){

            const hackathon = await hackathonModel.findOne({_id})

            if(hackathon){
                hackathon.image_url = image.path,
                hackathon.title = title
                hackathon.team_size = team_size
                hackathon.about = about
                hackathon.themes = themes
                hackathon.judges = judges
                hackathon.organizers = organizers
                hackathon.description = description
                hackathon.partners = partners
                hackathon.prizes = prizes
                hackathon.date = date 
                hackathon.mode = mode
                hackathon.phone = phone
                hackathon.email = email 
                hackathon.fee = fee 
                hackathon.eligibility = eligibility
                hackathon.start_time = start_time
                hackathon.end_time = end_time
                hackathon.conducted_by = conducted_by
                hackathon.max_users = max_users
                hackathon.isPrivate = isPrivate
                hackathon.client_id = client_id


                await hackathon.save();


                return res.json({
                    msg : "Updated successfully",
                    res : true,
                    hackathon
                })
            }
            else{
                return res.json({
                    msg : "Hackathon not found in database",
                    res : false,
                })
            }

        }



        // Create a new hackathon entry
        const hackathon = await hackathonModel.create({
            image_url: image.path,  // Store the image file path
            title,
            team_size,
            about,
            themes: Array.isArray(themes) ? themes : [themes], // Ensure it's an array
            judges: Array.isArray(judges) ? judges : [judges],
            organizers: Array.isArray(organizers) ? organizers : [organizers],
            description,
            partners: Array.isArray(partners) ? partners : [partners],
            prizes: Array.isArray(prizes) ? prizes : [prizes],
            date,
            mode,
            phone,
            email,
            fee,
            eligibility,
            start_time,
            end_time,
            conducted_by,
            max_users,
            isPrivate,
            client_id
        });

        // Respond with success
        return res.status(201).json({
            res: true,
            msg: "Hackathon added successfully",
            hackathon: hackathon
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
        const hackathons = await hackathonModel.find({isPrivate : false});

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

router.get('/showspecific', async (req, res) => {
    try {
        // Await the promise to get the data

        const {client_id} = req.query;



        if(!client_id){
            return res.json({
                res: true,
                message: "No hackathons found",
                hackathons: []
            })
        }

        const hackathons = await hackathonModel.find({client_id});

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



router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: "ID is required",
                res: false
            });
        }

        // If `id` is an ObjectId, uncomment the next line
        // const hackathon = await hackathonModel.findById(id);

        const hackathon = await hackathonModel.deleteOne({ _id: id });

        if (hackathon.deletedCount > 0) {
            return res.json({
                res: true,
            });
        } else {
            return res.json({
                res: false,
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