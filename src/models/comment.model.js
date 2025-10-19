import mogoose from 'mongoose';
const commentSchema = new mogoose.Schema({
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
        type:mogoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    userId:{
        type:mogoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

export default mogoose.models.Comment || mogoose.model("Comment",commentSchema);
