import mongoose from 'mongoose'


const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true,
        
    },
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String
    },

    login_type : {
        type : String,
        required : true
    },

    profile_url :{
        type: String
    },

    google_token : {
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    registered_events : {
        type : [Number]
    },
    is_host : {
        type : Boolean,
    },
    hosted_events : {
        type : [String]
    },
    is_verified : {
        type : Boolean
    },
    request_status : {
        type : String
    },
    phone : {
        type: Number
    },
    organization : {
        type : String
    },
    organization_id : {
        type : String
    },
    reason : {
        type : String
    },
    aadhar : {
        type :String
    }
})


const userModel = mongoose.model('user',userSchema)

export default userModel;