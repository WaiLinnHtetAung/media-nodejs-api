import {commentService, Msg} from "../utils/facades.js";

const getByPost = async(req,res,next) => {
    let {id} = req.params;

    let comments = await commentService.getByPost(id);

    if(comments) {
        Msg(res, "comment by post", comments);
    } else {
        next(new Error("Not Found"));
    }
}

const store = async(req,res,next) => {
    let payload = {
        postId:req.body.postId,
        user: req.userId,
        content: req.body.content,
        image: req.body.image
    }

    let result = await commentService.store(payload)
    if(result){
        Msg(res, "comment created", result);
    } else {
        next(new Error("Something went wrong"));
    }
}

export default {
    getByPost,
    store
}