import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    key : {
        type : String,
        required : true
    },
    isSuperAdmin : {
        type : Boolean,
        required : true
    },
    hasUsersAccess : {
        type: Boolean,
    },
    hasHackathonsAccess : {
        type : Boolean
    },
    hasProjectsAccess : {
        type : Boolean
    }
})


const adminModel = mongoose.model('admin',adminSchema);

export default adminModel;