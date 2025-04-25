import Joi from "joi"

const userSchema = Joi.object({
    register: Joi.object({
        name: Joi.string().min(5).max(30).required(),
        phone: Joi.string().min(7).max(11).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    }),
    login: Joi.object({
        name: Joi.string().min(5).max(30).required(),
        phone: Joi.string().min(7).max(11).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    })
})

export default userSchema