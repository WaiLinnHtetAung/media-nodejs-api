import Tag from "../models/Tag.js"

const getTags = async () => {
    let tags = null;
    try{
        tags = await Tag.find();
    }catch(error) {
        console.log("Error at tagservice getTags", error)
    } finally {
        return tags;
    }
};

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

const getByName = async(name) => {
    let tag = null;
    try {
        tag = await Tag.findOne({name})
    } catch (error) {
        console.error(error);
    } finally {
        return tag;
    }
};

const storeTag = async(name) => {
    let result = null;
    try{
        result = await new Tag({name}).save();
    }catch(error) {
        console.error(error);
    }finally {
        return result;
    }
}

const update = async(id, payload) => {
    let result = null;
    try{
        result = await Tag.findByIdAndUpdate(id, payload, {new: true})
    }catch(error) {
        console.error(error);
    }finally {
        return result;
    }
};

const drop = async(id) => {
    let result = null;
    try{
        result = await Tag.findByIdAndDelete(id);
    }catch(error) {
        console.error(error);
    }finally {
        return result;
    }
};

export default {
    getTags,
    getById,
    getByName,
    storeTag,
    update,
    drop,
}