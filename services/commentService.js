import Comment from "../models/Comment.js";

const getByPost = async (postId) => {
    let result = null;
    try{
        result = await Comment.find({postId});
    } catch (err) {
        console.error(err);
    } finally {
        return result;
    }
}

const store = async(payload) => {
    let result = null

    try{
        result = await new Comment(payload).save();
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

export default {
    getByPost,
    store
}