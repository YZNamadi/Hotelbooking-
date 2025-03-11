const Joi = require('joi');

exports.registerValidation = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).trim().pattern(/^\s*[A-Za-z]+\s*$/).require().messages({
            'any.required': 'Fullname is required',
            "string.empty": "Fullname cannot be Empty",
"string.pattern.base":'Fullname should only contain alphabets',
'string.min':'Fullname should not be less than 3 letters'
        }),
        email: Joi.string().email().required().messages({
            'string.email':"invalid email format",
            "any.required":"Email is required"
        }),
        password: Joi.string().min(6).required.messages({
            "string.min":"password must be at least 6 characters",
            "any.required":"Email is required"
        })
    })
    const {error} = schema.validate(req.body,{
        aboutEarly:false
    })
    if(error){
        return res.status(400).json({
            message:error.message
        })
    }
}


