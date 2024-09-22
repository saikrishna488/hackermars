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
    hasHackathonAccess : {
        type : Boolean
    },
    hasPaymentAccess : {
        type :Boolean
    },
    hasClientsAccess : {
        type : Boolean
    }
})


const adminModel = mongoose.model('admin',adminSchema);

export default adminModel;