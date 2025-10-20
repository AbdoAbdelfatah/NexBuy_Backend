const reqKeys = ['body', 'params', 'query', 'header'];

export const validationMiddleware = (schema) => {
    return (req, res, next) => {
        let validationErrors = [];
        
        for (let key of reqKeys) {
            const result = schema[key]?.validate(req[key], {
                abortEarly: false,
                stripUnknown: true,
                allowUnknown: false
            });
            
            if (result?.error) {
                validationErrors.push(...result.error.details);
            }
            
            if (result?.value && schema[key]) {
                req[key] = result.value;
            }
        }
        
        if (validationErrors.length) {
            const err = new Error("Validation Error");
            err.status = 400;
            err.details = validationErrors;
            return next(err);
        }
        
        next();
    };
};