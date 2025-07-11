import {commentService, Msg} from "../utils/facades.js";

const getByPost = async(req,res,next) => {
    let {id} = req.params;
    let role = req.user.role;
    let comments = await commentService.getByPost(role, id);

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

const update = async(req,res,next) => {
    let {id: commentId} = req.params;
    let {status} = req.body;

    let updatedComment = await commentService.update(commentId, {status});

    Msg(res, "comment updated", updatedComment);
}

export default {
    getByPost,
    store,
    update,
}