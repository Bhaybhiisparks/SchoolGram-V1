import { check, validationResult } from "express-validator";

export const Validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
};

export const validatePostCreation =  [
    check('userId').notEmpty().withMessage('User ID is required.'),
    check('content').notEmpty().withMessage('Content is required.'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); 
    }
];
export default { Validate, validatePostCreation };