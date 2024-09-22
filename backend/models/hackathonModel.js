import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    team_size: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    themes: {
        type: [String], // Array of strings to store multiple themes
        required: true,
    },
    judges: {
        type: [String], // Array of strings to store names or details of judges
        required: true,
    },
    organizers: {
        type: [String], // Array of strings to store names or details of organizers
        required: true,
    },
    description: {
        type: String, // Assuming schedule is a description; if it's a more complex structure, adjust as needed
        required: true,
    },
    partners: {
        type: [String], // Array of strings to store names or details of partners
        required: true,
    },
    prizes: {
        type: [String], // Array of strings to store names or details of winners
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    mode: {
        type: String, // For example, "online" or "offline"
        required: true,
    },
    phone: {
        type: String, // Contact information, e.g., phone number or email
        required: true,
    },
    email: {
        type: String, // Contact information, e.g., phone number or email
        required: true,
    },
    fee : {
        type : String,
    },
    registered_users : {
        type : [String],
    },
    eligibility : {
        type : String,
    },
    isPrivate :{
        type :Boolean
    },
    start_time  : {
        type : Date
    },
    end_time : {
        type : Date
    },
    conducted_by : {
        type :String,
        required : true
    },
    max_users : {
        type : Number,
        required : true
    },
    client_id : {
        type : String
    }
}, { timestamps: true });

const hackathonModel = mongoose.model('Hackathon', hackathonSchema);

export default hackathonModel;
