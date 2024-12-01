import express from 'express'
const router = express.Router();
import hackathonModel from '../models/hackathonModel.js';
import multer from 'multer';
import userModel from '../models/userModel.js';
import { sendEmail } from '../essentials/nodeMail.js';



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
            start_date,
            end_date,
            mode,
            phone,
            email,
            eligibility,
            conducted_by,
            max_users,
            isPrivate,
            client_id,
            _id,
            location,
        } = req.body;



        const image = req.file;

        console.log(title,
            team_size,
            about,
            themes,
            judges,
            organizers,
            description,
            partners,
            prizes,
            start_date,
            end_date,
            mode,
            phone,
            email,
            eligibility,
            conducted_by,
            max_users,
            isPrivate,
            client_id,
            _id,
            location,
            image)

        // Validate that all required fields are provided
        if (!title || !team_size || !about || !themes || !judges || !organizers || !description || !partners || !prizes || !start_date || !end_date || !mode || !phone || !email || !eligibility || !conducted_by || !max_users || !image || !client_id) {
            return res.status(400).json({
                msg: "Fill all the fields",
                res: false
            });
        }

        if (_id) {

            const hackathon = await hackathonModel.findOne({ _id })

            if (hackathon) {
                hackathon.image = image.path,
                    hackathon.title = title
                hackathon.team_size = team_size
                hackathon.about = about
                hackathon.themes = themes
                hackathon.judges = judges
                hackathon.organizers = organizers
                hackathon.description = description
                hackathon.partners = partners
                hackathon.prizes = prizes
                hackathon.start_date = start_date
                hackathon.end_date = end_date
                hackathon.mode = mode
                hackathon.phone = phone
                hackathon.email = email
                hackathon.eligibility = eligibility
                hackathon.conducted_by = conducted_by
                hackathon.max_users = max_users
                hackathon.isPrivate = isPrivate
                hackathon.client_id = client_id
                hackathon.location = location || null


                await hackathon.save();


                return res.json({
                    msg: "Updated successfully",
                    res: true,
                    hackathon
                })
            }
            else {
                return res.json({
                    msg: "Hackathon not found in database",
                    res: false,
                })
            }

        }



        // Create a new hackathon entry
        const hackathon = await hackathonModel.create({
            image: image.path,  // Store the image file path
            title,
            team_size,
            about,
            themes: Array.isArray(themes) ? themes : [themes], // Ensure it's an array
            judges: Array.isArray(judges) ? judges : [judges],
            organizers: Array.isArray(organizers) ? organizers : [organizers],
            description,
            partners: Array.isArray(partners) ? partners : [partners],
            prizes: Array.isArray(prizes) ? prizes : [prizes],
            start_date: start_date,
            end_date: end_date,
            mode,
            phone,
            email,
            eligibility,
            conducted_by,
            max_users,
            isPrivate,
            client_id,
            location,
        });

        const user = await userModel.findById(client_id)

        if (!user || user.request_status != "verified") {
            return res.json({
                res: false,
                msg: "User Not found",
            });
        }

        user.hosted_events.push(hackathon._id)
        await user.save()

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
        const hackathons = await hackathonModel.find({ isPrivate: false });

        if (hackathons.length > 0) {
            return res.json({
                res: true,
                hackathons
            });
        } else {
            return res.json({
                res: true,
                msg: "No hackathons found",
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




router.post('/showspecific', async (req, res) => {
    try {
        // Await the promise to get the data

        const { client_id } = req.body;



        if (!client_id) {
            return res.json({
                res: true,
                msg: "User Not found",
                hackathons: []
            })
        }

        const hackathons = await hackathonModel.find({ client_id });

        if (hackathons.length > 0) {
            return res.json({
                res: true,
                hackathons
            });
        } else {
            return res.json({
                res: true,
                msg: "No hackathons found",
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
                msg: "Deleted Successfully"
            });
        } else {
            return res.json({
                res: false,
                msg: "No hackathon found"
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



router.post('/register', async (req, res) => {
    try {
        const { teamName, idea, teamMembers, hackathon_id } = req.body;

        if (!teamName || !hackathon_id || !idea || teamMembers.length === 0) {
            return res.status(400).json({
                msg: "fields are required",
                res: false
            });
        }



        const hackathon = await hackathonModel.findOne({ _id: hackathon_id });

        if (!hackathon) {
            return res.json({
                res: false,
                msg: "Hackathon not found"
            });
        }


        if (teamMembers.length > hackathon.team_size) {
            return res.json({
                res: false,
                msg: "Team size is greater than max participants"
            });
        }

        const user = await userModel.findOne({ email: teamMembers[0].email });

        if (!user) {
            return res.json({
                res: false,
                msg: "Make Sure All the users Registered on this platform"
            });
        }

        if (user.registered_events.includes(hackathon_id)) {
            return res.json({
                res: false,
                msg: "Already Registered"
            });
        }



        hackathon.registered_users.push({
            teamName,
            idea,
            teamMembers
        });

        await hackathon.save();

        sendEmail(user.email, "Hackathon Registration", `You have successfully registered for the hackathon ${hackathon.title}`)

        user.registered_events.push(hackathon_id)
        await user.save()

        return res.json({
            res: true,
            msg: "Registered successfully",
            user
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "An error occurred, please try again later",
            res: false
        });
    }
});


// team idea approve or reject 

router.post('/teamidea', async (req, res) => {
    try {
        const { hackathon_id, teamName, status } = req.body;

        // Check for required fields
        if (!hackathon_id || teamName === undefined || status === undefined) {

            return res.status(400).json({
                msg: "All fields are required.",
                res: false
            });
        }

        // Find the hackathon by ID
        const hackathon = await hackathonModel.findById(hackathon_id);
        if (!hackathon) {
            return res.status(404).json({
                res: false,
                msg: "Hackathon not found."
            });
        }

        // Find the team by name
        const team = hackathon.registered_users.find((team) => team.teamName === teamName);

        if (!team) {
            return res.status(404).json({
                res: false,
                msg: "Team not found."
            });
        }

        // Update the team's status
        team.status = status;

        // Save the hackathon document
        await hackathon.save();

        return res.json({
            res: true,
            msg: "Updated successfully.",
            hackathon
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "An error occurred, please try again later.",
            res: false
        });
    }
});


// send notifiqation to all registered users
router.post('/notify', async (req, res) => {
    try {
        const { hackathon_id, message, client_id } = req.body;

        // Check for required fields
        if (!hackathon_id || !message || !client_id) {
            return res.status(400).json({
                msg: "All fields are required.",
                res: false
            });
        }

        // Find the hackathon by ID
        const hackathon = await hackathonModel.findById(hackathon_id);
        if (!hackathon) {
            return res.status(404).json({
                res: false,
                msg: "Hackathon not found."
            });
        }

        if (hackathon.client_id != client_id) {
            return res.status(404).json({
                res: false,
                msg: "You are not authorized to send notification."
            });
        }

        // Add the notification to the hackathon document
        hackathon.notifications.push({
            message,
            date: new Date(),
        });

        // Get all registered users
        const users = hackathon.registered_users.map((team) => team.teamMembers[0].email);

        for (const email of users) {
            const user = await userModel.findOne({ email });
            
            if (user) {
                user.notifications.push({
                    message,
                    date: new Date(),
                });
        
                await user.save();
            }
        }

        // Save the hackathon document
        await hackathon.save();

        return res.json({
            res: true,
            msg: "Notification sent successfully.",
            hackathon
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "An error occurred, please try again later.",
            res: false
        });
    }
});


router.post('/getevents', async (req,res)=>{
    try{

        const {ids} = req.body;

        console.log(req.body)

        if(!ids || ids.length === 0){
            return res.status(400).json({
                msg : "IDs are required",
                res : false
            })
        }

        

        const events = await hackathonModel.find({_id : {$in : ids}})

        if(events.length > 0){
            return res.json({
                res : true,
                msg : "Events found",
                events 
            })
        }
        else{
            return res.json({
                res : true,
                msg : "No events found",
                events : []
            })
        }

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            msg : "An error occurred, please try again later",
            res: false
        })
    }
})



export default router;