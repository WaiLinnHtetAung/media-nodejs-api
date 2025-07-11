import {deleteFileWithLink, Msg, postService} from "../utils/facades.js";

const index = async(req, res, next) => {
    let {index} = req.params;
    let posts = await postService.getPosts(index);

    if(posts) {
        Msg(res, "Paginated posts", posts);
    } else {
        next(new Error("Something went wrong"));
    }
}

const store = async (req, res, next) => {
    req.body['author'] = req.userId;
    let result = await postService.store(req.body);
    if(!result){
        next(new Error('Something went wrong'));
    } else {
        Msg(res, "success", result)
    }

}

const update = async (req, res, next) => {
    let payload = req.body;
    let {id} = req.params;

    let post = await postService.getById(id);

    if(post) {
        if(Object.keys(payload).includes('images')) {
            post.images.forEach(image => deleteFileWithLink(image))
        }
        let result = await postService.update(id, payload);
        Msg(res, "success", result)
    }else {
        next(new Error("No Post Found"));
    }
}

const drop = async(req, res, next) => {
    let {id} = req.params;
    let post = await postService.getById(id);

    if(post) {
        post.images.forEach(image => deleteFileWithLink(image))
        await postService.drop(id);
        Msg(res, "success", {})
    } else {
        next(new Error("No Post Found"));
    }
}

const getByTag = async(req, res, next) => {
    let {id, index} = req.params;

    let posts = await postService.getByTag(id, index);
    if(posts) {
        Msg(res, "Posts by tag", posts);
    } else {
        next(new Error("No Post Found"));
    }
}

const getByCategory = async(req, res, next) => {
    let {id, index} = req.params;

    let posts = await postService.getByCategory(id, index);
    if(posts) {
        Msg(res, "Posts by category", posts);
    } else {
        next(new Error("No Post Found"));
    }
}

const getByAuthor = async(req, res, next) => {
    let {id, index} = req.params;

    let posts = await postService.getByAuthor(id, index);
    if(posts) {
        Msg(res, "Posts by author", posts);
    } else {
        next(new Error("No Post Found"));
    }
}

export default {
    index,
    store,
    update,
    drop,
    getByTag,
    getByCategory,
    getByAuthor,
}