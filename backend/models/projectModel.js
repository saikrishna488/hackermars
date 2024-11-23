import {model, Schema} from 'mongoose';

const projectSchema = Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    contributors : {
        type: [String],
        required: true
    },
    languages : {
        type: [String],
        required: true
    },
    tags : {
        type: [String],
        required: true
    },
    user : {
        type : {
            id : {
                type :  String,
                required : true
            },
            name : {
                type : String,
                required : true
            }
        }
    },
    codeLink : {
        type: String,
        required: true
    },
    demoLink : {
        type: String,
        required: true
    },
    likes : {
        type: Number,
        default: 0
    },
    liked_by : {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}, {
    timestamps: true
});


const projectModel = model('project',projectSchema);

export default projectModel;