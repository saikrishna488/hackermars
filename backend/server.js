import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.js'
import hackathonRouter from './routes/hackathon.js'
import adminRouter from './routes/admin.js'
import projectRouter from './routes/project.js'
const port = 5000 || process.env.PORT
import db from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()
db();

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//routes
app.use('/user', userRouter)
app.use('/hackathon', hackathonRouter)
app.use('/admin',adminRouter)
app.use('/project',projectRouter)

app.get('/',(req,res)=>{
    res.send("api is live")
})



app.listen((port), ()=>console.log("Server running on port :"+port))