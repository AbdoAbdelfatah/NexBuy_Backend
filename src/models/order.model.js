import mongoose from 'mongoose';

const orderItemSchema =new mongoose.Schema (
    {
        product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,min:1,required:true},
        priceAtPurchase:{type:Number,required:true,min:0}
    },
    {
    _id: false
    }
);

const orderSchema=new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        items:[orderItemSchema],
        totalPrice:{type:Number,required:true,min:0},
         status: {
            type: String,
            enum: ["pending","completed", "cancelled"],
            default: "pending"
        },
        shippingAddress: {
        fullname: String,
        line: String,
        city: String, 
        country: String
        },
        placedAt: { type: Date, default: Date.now }

    },
    {
        timestamps:true
    }
);


export default mongoose.models.Order || mongoose.model("Order",orderSchema);