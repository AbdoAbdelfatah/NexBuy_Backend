import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        minLength:1,
        maxLength:500
    },
    rate:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

export default mongoose.models.Comment || mongoose.model("Comment",commentSchema);
