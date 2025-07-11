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

export default {
    getPosts,
    getById,
    store,
    update,
}