import Post from "../models/Post.js";

const getPosts = async(index) => {
    let count = 10;

    let result = null;
    try{
        result = await Post.find({}).skip(index * count).sort({'created': -1}).limit(count);
    }catch (err) {
        console.log(err);
    } finally {
        return result;
    }
}

const getById = async(id) => {
    let result = null;
    try{
        result = await Post.findById(id);
    } catch(err){
        console.log(err);
    } finally {
        return result;
    }
}

const store = async(payload) => {
    let result = null;
    try{
        result = await new Post(payload).save();
    } catch (error) {
        console.error(error);
    } finally {
        return result;
    }
}

const update = async(id, payload) => {
    let result = null;
    try{
        result = await Post.findByIdAndUpdate(id, payload, {new: true});
    }catch(error){
        console.error(error);
    }finally {
        return result;
    }
}

const drop = async(id) => await Post.findByIdAndDelete(id);

const getByTag = async(tagId, index) => {
    let count = 10;
    let result = null;
    try{
        result = await Post.find({tag:tagId}).skip(index * count).sort({'created': -1}).limit(count);
    } catch(err){
        console.error(err);
    } finally {
        return result;
    }
}

const getByCategory = async(categoryId, index) => {
    let count = 10;
    let result = null;

    try{
        result = await Post.find({category: categoryId}).skip(index * count).sort({'created': -1}).limit(count);
    } catch(err){
        console.error(err);
    } finally {
        return result;
    }
}

const getByAuthor = async(authorId, index) => {
    let count = 10;
    let result = null;

    try{
        result = await Post.find({author: authorId}).skip(index * count).sort({'created': -1}).limit(count);
    } catch(err){
        console.error(err);
    } finally {
        return result;
    }
}

export default {
    getPosts,
    getById,
    store,
    update,
    drop,
    getByTag,
    getByCategory,
    getByAuthor,
}