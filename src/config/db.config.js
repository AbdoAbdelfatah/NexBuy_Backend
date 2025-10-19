import mongoose from 'mongoose';
 
export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connect to database successfully");
    }catch(err){
        console.log("Error Message: ",err);  
        process.exit(1);//Exits with failure (used for errors)
        //
        // Exits normally (success)
        // process.exit(0);
        //
    }
}
//"process" is a global built-in object in Node.js.
//It gives you information and control over the current running Node.js program.
//You don’t need to import it — Node.js provides it automatically.