import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:10,
        max:100
    },
    gender:{
        type:String,
        enum:["male","female"],
        default:"male"
    },
    cart:[
        {
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
        quantity:{type:Number,default:1,min:1}
        }   
    ]
},{
    timestamps:true
});
// Do mongoose.models.User || mongoose.model("User",userSchema);
// Best Practice (safe & reusable)  why --> mongoose.models is a cache (object) that stores all compiled models by name.
// to avoid OverwriteModelError
export default mongoose.models.User || mongoose.model("User",userSchema);