const reqKeys=['body','params','query','header'];

export const validationMiddleware=(schema)=>{
    return (req,res,next)=>{
        let validationErrors=[];
        for(let key of reqKeys){
            const result=schema[key]?.validate(req[key],{abortEarly:false});
            if(result?.error){
                validationErrors.push(...result.error.details);
            }
        }
        console.log("------->>>>erorororor");
     if (validationErrors.length) {
        console.log("Validation failed:", validationErrors);
        const err = new Error("Validation Error");
        err.status = 400;
        err.details = validationErrors;
        return next(err);
    }
                
        next();
    };

} ;