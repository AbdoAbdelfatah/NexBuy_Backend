import {createProduct , getAllProducts} from '../services/product.service.js';

export const createProductController = async(req,res,next)=>{
    try{
        const id=req.user.id;
        const productData={...req.body,createdBy:id};

        const newProduct=await createProduct(productData);
        
        res.status(201).json({
        message: "Product created successfully",
        newProduct
        });
    }catch(err){
        next(err);
    }
} 


export const getProductsController=async(req,res,next)=>{
    try{
        const products=await getAllProducts();
        res.json({products});
    }catch(err){
        next(err);
    }
}