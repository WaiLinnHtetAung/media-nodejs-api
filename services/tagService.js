import Tag from "../models/Tag.js"

const getTags = async () => await Tag.find();

const getById = async (id) => {
    let tag = null;

    try {
        tag = await Tag.findById(id);
    } catch (error) {
        console.error(error);
    } finally {
        return tag;
    }
}

const getByName = async(name) => await Tag.findOne({name});

const storeTag = async(name) => await new Tag({name}).save();

export default {
    getTags,
    getById,
    getByName,
    storeTag,
}