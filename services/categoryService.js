import Category from '../models/Category.js'

const getCategories = async(req,res)=>{
    return await Category.find();
}

const storeCategory = async(name, image, description) => {
    return await new Category({name, image, description}).save();
}

export default {
    getCategories,
    storeCategory,
}