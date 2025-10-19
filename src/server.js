import app from './app.js';
import { connectDB } from './config/db.config.js';
import dotenv from 'dotenv';

dotenv.config();//It loads environment variables from a .env file into your Node.js app’s process.env object.
const PORT=process.env.PORT||5000;


connectDB()
.then(()=>{
    app.listen(PORT,()=>console.log(`server run sucessfully in ${PORT}`));
});
