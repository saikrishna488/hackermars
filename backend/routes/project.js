import express from 'express';
const router = express.Router();
import projectModel from '../models/projectModel.js';
import userModel from '../models/userModel.js';



router.post('/addproject', async (req, res) => {
    try {

        const { title, description, contributors, languages, tags, user, codeLink, demoLink, _id } = req.body;


        if (!title || !description || !contributors || !languages || !tags || !user || !codeLink || !demoLink) {
            return res.status(400).json({ msg: 'All fields are required', res: false });
        }


        //edit project
        if (_id) {
            const project = await projectModel.findById(_id);
            if (!project) {
                return res.status(400).json({ msg: 'Project not found', res: false });
            }
            const updatedProject = await projectModel.findByIdAndUpdate(_id, {
                title,
                description,
                contributors,
                languages,
                tags,
                user,
                codeLink,
                demoLink
            }, { new: true });
            return res.json({
                res: true,
                project: updatedProject,
                msg: 'Project updated successfully'
            })
        }


        //new project
        const u = await userModel.findById(user.id);

        if (!u) {
            return res.status(400).json({ msg: 'User not found', res: false });
        }


        const newProject = new projectModel({
            title,
            description,
            contributors,
            languages,
            tags,
            user,
            codeLink,
            demoLink
        });
        const project = await newProject.save();

        res.json({
            res: true,
            project,
            msg: 'Project added successfully'
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error', res: false });
    }
})

// all projects
router.get('/getprojects', async (req, res) => {
    try {
        const projects = await projectModel.find();

        const modifiedProjects = projects.map(({ _doc: { liked_by, ...rest } }) => rest);

        res.json({
            res: true,
            projects: modifiedProjects,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error', res: false });
    }
})

// get projects by user
router.get('/getuserprojects/:userId', async (req, res) => {
    try {
        const projects = await projectModel.find({ "user.id": req.params.userId });


        if (!projects.length) {
            return res.json({ msg: 'Projects not found', res: false });
        }

        const modifiedProjects = projects.map(({ _doc: { liked_by, ...rest } }) => rest);

        res.json({
            res: true,
            projects: modifiedProjects,
            msg: 'Projects fetched successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', res: false });
    }
});





router.get('/getproject/:id', async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(400).json({ msg: 'Project not found', res: false });
        }

        const { liked_by, ...rest } = project._doc;
        res.json({
            res: true,
            project: rest
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error', res: false });
    }
})


//like project
router.post('/likeproject', async (req, res) => {
    try {
        const { projectId, userId } = req.body;

        const project = await projectModel.findById(projectId);


        if (!project) {
            return res.status(400).json({ msg: 'Project not found', res: false });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: 'User not found', res: false });
        }

        if (project.liked_by.includes(userId)) {

            project.liked_by.remove(userId);
            project.likes = project.likes - 1;
            await project.save();


            const { liked_by, ...rest } = project._doc;
            return res.json({
                res: true,
                msg: 'Disliked project',
                project: rest
            })
        }

        project.liked_by.push(userId);
        project.likes = project.likes + 1;
        await project.save();

        const { liked_by, ...rest } = project._doc;
        res.json({
            res: true,
            project: rest,
            msg: 'Project liked successfully'
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error', res: false });
    }
})


// get likes
router.post('/getlike', async (req, res) => {
    try {
        const { projectId, userId } = req.body;

        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(400).json({ msg: 'Project not found', res: false });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User not found', res: false });
        }

        res.json({
            msg: 'Likes fetched successfully',
            res: true,
            like: project.liked_by.includes(userId),
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error', res: false });
    }
})


//deleteproject
router.delete('/deleteproject/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if ID is valid
        if (!id) {
            return res.status(400).json({ msg: 'Invalid project ID', res: false });
        }

        // Find and delete the project
        const proj = await projectModel.findOneAndDelete({ _id: id });

        if (!proj) {
            return res.status(404).json({ msg: 'Project not found', res: false });
        }

        // Success response
        res.status(200).json({ msg: 'Project deleted successfully', res: true,project:proj });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', res: false });
    }
});


export default router;