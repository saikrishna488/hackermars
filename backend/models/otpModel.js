import mongoose from 'mongoose'


const otpSchema = mongoose.Schema({

    otp : {
        type : Number
    },
    email : {
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const otpModel = mongoose.model('otp',otpSchema)

export default otpModel;