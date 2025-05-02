import Joi from "joi"

const userSchema = {
    registerSchema: Joi.object({
        name: Joi.string().min(5).max(30).required(),
        displayName: Joi.string().min(5).max(30).required(),
        phone: Joi.string().min(7).max(11).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
    }),

    loginSchema: Joi.object({
        name: Joi.string().min(5).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
    })
}

export default userSchema