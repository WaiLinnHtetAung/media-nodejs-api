import Comment from "../models/Comment.js";

const getByPost = async (role, postId) => {
    let result = null;
    try{
        switch (role) {
            case 0 : result = await Comment.find({postId}); break;
            default : result = await Comment.find({postId, status: 'ACCEPT'}); break;
        }
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

const update = async(commentId, payload) => {
    let result = null;
    try {
        result = await Comment.findByIdAndUpdate(commentId, payload, {new: true})
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

const drop = async(id) => {
    let result = null;
    try{
        result = await Comment.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

export default {
    getByPost,
    store,
    update,
    drop
}