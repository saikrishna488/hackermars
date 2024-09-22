import mongoose from 'mongoose'


const clientSchema = mongoose.Schema({

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

    otp : {
        type : String,
    },

    profile_url :{
        type: String
    },

    credits : {
        type : Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    phone : {
        type : Number
    },
    events : {
        type: [String]
    },
    is_verified :{
        type: Boolean,
    }
})


const clientModel = mongoose.model('client',clientSchema)

export default clientModel;