import Joi from "joi";

const postSchema = {
    store: Joi.object({
        title: Joi.string().min(5).max(30).required(),
        content: Joi.string().required(),
        category: Joi.string().required(),
        tag: Joi.string().required(),
    })
}

export default postSchema