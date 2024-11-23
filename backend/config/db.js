import mongoose from "mongoose";


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit the process with failure code
    }
};

export default connect