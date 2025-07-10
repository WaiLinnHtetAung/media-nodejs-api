import Post from "../models/Post.js";

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

export default {
    store
}