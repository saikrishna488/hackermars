import express from "express";
import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";
import hackathonModel from "../models/hackathonModel.js";
import projectModel from "../models/projectModel.js";
const router = express.Router();

//login
router.post("/login", async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.json({
        msg: "Missing fields",
        res: false,
      });
    }

    const admin = await adminModel.findOne({ key });

    if (!admin) {
      return res.json({
        msg: "Admin doesn't exist",
        res: false,
      });
    }

    return res.json({
      msg: "Authenticated",
      admin,
      res: true,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

// add admin
router.post("/add", async (req, res) => {
  try {
    const {
      key,
      name,
      hasUsersAccess,
      hasHackathonsAccess,
      hasProjectsAccess,
    } = req.body;

    if (!key || !name) {
      return res.json({
        msg: "Missing token",
        res: false,
      });
    }

    const admin = await adminModel.findOneAndUpdate(
      { key },
      {
        name,
        key,
        hasUsersAccess: hasUsersAccess || false,
        hasHackathonsAccess: hasHackathonsAccess || false,
        hasProjectsAccess: hasProjectsAccess || false,
        isSuperAdmin: false,
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!admin) {
      return res.json({
        msg: "User doesn't exist",
        res: false,
      });
    }

    return res.json({
      msg: "Admin Added",
      res: true,
      admin,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

// fetch all admins
router.get("/admins", async (req, res) => {
  try {
    const admins = await adminModel.find({}).lean();

    const sanitizedAdmins = admins
      .filter((admin) => !admin.isSuperAdmin) // Remove entries with isSuperAdmin: true
      .map(({ key, ...rest }) => rest);

    if (admins.length === 0) {
      return res.status(404).json({
        msg: "No admins found",
        res: false,
      });
    }

    return res.status(200).json({
      msg: "Admins found",
      res: true,
      admins: sanitizedAdmins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

// delete admins
router.post("/remove", async (req, res) => {
  try {
    const { adminIds, key } = req.body;
    console.log(req.body);

    if (!adminIds) {
      return res.json({
        msg: "Missing fields",
        res: false,
      });
    }

    const admin = await adminModel.findOne({ key });

    if (!admin.isSuperAdmin) {
      return res.json({
        msg: "Admin doesn't have access",
        res: false,
      });
    }

    const admins = await adminModel.deleteMany({ _id: { $in: adminIds } });

    if (!admins) {
      return res.json({
        msg: "Admins not found",
        res: false,
      });
    }

    return res.json({
      msg: "Admins Deleted",
      res: true,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

//fetch user
router.post("/user", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        msg: "Missing email",
        res: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        msg: "user doesn't exist",
        res: false,
      });
    }

    return res.json({
      msg: "fetched",
      user,
      res: true,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

//fetch user
router.post("/userupdate", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      aadhar,
      organization,
      organization_id,
      login_type,
      profile_url,
      is_verified,
      request_status,
      reason,
    } = req.body;

    if (!email || !name || !login_type || !organization) {
      return res.json({
        msg: "Missing Fields",
        res: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        msg: "user doesn't exist",
        res: false,
      });
    }

    user.name = name;
    user.email = email;
    user.login_type = login_type;
    user.is_verified = is_verified;
    user.phone = phone || null;
    user.aadhar = aadhar || null;
    user.organization = organization || null;
    user.organization_id = organization_id || null;
    user.reason = reason || null;
    user.profile_url = profile_url || null;
    user.request_status = request_status || null;

    await user.save();

    return res.json({
      msg: "update successful",
      user,
      res: true,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

router.post("/userdelete", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        msg: "Missing email",
        res: false,
      });
    }

    const user = await userModel.findOneAndDelete({ email });

    if (!user) {
      return res.json({
        msg: "user doesn't exist",
        res: false,
      });
    }

    return res.json({
      msg: "User Deleted Successfully",
      res: true,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

//requests endpoint
router.get("/userrequests", async (req, res) => {
  try {
    const requests = await userModel.find({ request_status: "pending" });

    if (requests.length === 0) {
      return res.status(404).json({
        msg: "No requests found",
        res: false,
      });
    }

    return res.status(200).json({
      msg: "Requests found",
      res: true,
      requests,
    });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

router.post("/verifyuser", async (req, res) => {
  try {
    const { email, task } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        res: false,
      });
    }

    if (task == "approve") {
      user.request_status = "verified";
    } else if (task == "reject") {
      user.request_status = "rejected";
    }

    await user.save();

    return res.status(200).json({
      msg: "Updated",
      res: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

router.post("/updatehackathon", async (req, res) => {
  try {
    const { adminId, hackathonId, updatedObject } = req.body;

    console.log(req.body);

    if (!adminId || !hackathonId) {
      return res.json({
        msg: "Missing fields",
        res: false,
      });
    }

    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.json({
        msg: "Admin not found",
        res: false,
      });
    }

    if (!admin.hasHackathonsAccess) {
      return res.json({
        msg: "Admin doesn't have Hackathon access",
        res: false,
      });
    }

    const hackathon = await hackathonModel.findById(hackathonId);

    if (!hackathon) {
      return res.json({
        msg: "Hackathon not found",
        res: false,
      });
    }

    hackathon.set(updatedObject);
    await hackathon.save();

    return res.json({
      msg: "Hackathon Updated",
      res: true,
      hackathon,
    });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return res.status(500).json({ msg: "Error, try again later", res: false });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const hackathons = await hackathonModel.find({ featured: true }).lean();

    const sanitizedHackathons = hackathons.map(
      ({ registered_users, notifications, ...rest }) => rest
    );

    return res.json({
      msg: "Fetched",
      res: true,
      hackathons: sanitizedHackathons,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
      res: false,
    });
  }
});

router.post("/updateproject", async (req, res) => {
  try {
    const { adminId, projectId, updatedObject } = req.body;

    if (!adminId || !projectId) {
      return res.json({
        msg: "Missing fields",
        res: false,
      });
    }

    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.json({
        msg: "Admin not found",
        res: false,
      });
    }

    if (!admin.isSuperAdmin) {
      if (!admin.hasProjectAccess) {
        return res.json({
          msg: "Admin doesn't have write access",
          res: false,
        });
      }
    }

    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.json({
        msg: "Project not found",
        res: false,
      });
    }

    project.set(updatedObject);
    await project.save();

    return res.json({
      msg: "Project Updated",
      res: true,
      project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
      res: false,
    });
  }
});

//delete hackathon
router.post("/deletehackathon", async (req, res) => {
  try {
    const { adminId, hackathonId } = req.body;

    if (!adminId || !hackathonId) {
      return res.json({
        msg: "Missing fields",
        res: false,
      });
    }

    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.json({
        msg: "Admin not found",
        res: false,
      });
    }

    if (!admin.hasHackathonsAccess) {
      return res.json({
        msg: "Admin doesn't have write access",
        res: false,
      });
    }

    const hackathon = await hackathonModel.findByIdAndDelete(hackathonId);

    if (!hackathon) {
      return res.json({
        msg: "Hackathon not found",
        res: false,
      });
    }

    return res.json({
      msg: "Hackathon Deleted",
      res: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
      res: false,
    });
  }
});

router.post("/deleteproject", async (req, res) => {
  try {
    const { adminId, projectId } = req.body;

    if (!adminId || !projectId) {
      return res.json({
        msg: "Missing fields",
        res: false,
      });
    }

    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.json({
        msg: "Admin not found",
        res: false,
      });
    }

    if (!admin.isSuperAdmin) {
      if (!admin.hasProjectAccess) {
        return res.json({
          msg: "Admin doesn't have write access",
          res: false,
        });
      }
    }

    const project = await projectModel.findByIdAndDelete(projectId);

    if (!project) {
      return res.json({
        msg: "Project not found",
        res: false,
      });
    }

    return res.json({
      msg: "Project Deleted",
      res: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
      res: false,
    });
  }
});

export default router;
