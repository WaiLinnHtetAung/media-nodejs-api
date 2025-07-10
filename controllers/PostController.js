import {Msg, postService} from "../utils/facades.js";

const store = async (req, res, next) => {
    req.body['author'] = req.userId;
    let result = await postService.store(req.body);
    if(!result){
        next(new Error('Something went wrong'));
    } else {
        Msg(res, "success", result)
    }

}

export default {
    store
}