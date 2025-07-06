import Joi from 'joi';

const tagSchema = {
    store: Joi.object({
        name: Joi.string().min(5).max(30).required(),
    })
}

export default tagSchema;