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
    is_Client : {
        type :Boolean
    },
    registered_events : {
        type : [Number]
    }
})


const userModel = mongoose.model('user',userSchema)

export default userModel;