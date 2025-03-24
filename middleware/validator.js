const Joi = require('joi');

exports.registerValidation = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).trim().pattern(/^\s*[A-Za-z]+\s*$/)
            .required()
            .messages({
                'any.required': 'Fullname is required',
                "string.empty": "Fullname cannot be empty",
                "string.pattern.base": 'Fullname should only contain alphabets',
                'string.min': 'Fullname should not be less than 3 letters'
            }),

        email: Joi.string().email()
            .required()
            .messages({
                'string.email': "Invalid email format",
                "any.required": "Email is required"
            }),

        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                "any.required": "Password is required",
                "string.empty": "Password cannot be empty",
                "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character [!@#$%^&*]"
            }),

        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                "any.only": "Passwords do not match"
            })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: error.details.map(err => err.message) // Return all error messages
        });
    }

    next();
};


