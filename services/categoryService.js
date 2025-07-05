import Category from '../models/Category.js'

const getById = async (id) => {
    return await Category.findById(id);
}

const getByName = async(name) => {
    return await Category.findOne({name})
}

const getCategories = async(req,res)=>{
    return await Category.find();
}

const storeCategory = async(name, image, description) => {
    return await new Category({name, image, description}).save();
}

const updateCategory = async(id, payload)=>{
    return await Category.findByIdAndUpdate(id, payload);
}

const drop = async(id) => {
    return await Category.findByIdAndDelete(id);
}

export default {
    getById,
    getByName,
    getCategories,
    storeCategory,
    updateCategory,
    drop,
}