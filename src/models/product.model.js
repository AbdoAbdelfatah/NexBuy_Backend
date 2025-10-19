import mongoose from 'mongoose';

const productSchema= new mongoose.Schema(
{
    title:{ 
        type:String,
        required:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
        trim:true
    },
    desc:String,
    price:{
        type:Number,
        min:1,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    images:[{
        url:{type:String, required:true},
        alt:{type:String,required:true}
    }],
    specs:{
        type:Map,
        of:String|Number
    }

},{
    timestamps:true
});


export default mongoose.models.Product || mongoose.model("Product",productSchema);