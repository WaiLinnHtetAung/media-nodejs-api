import { Msg, tagService } from '../utils/facades.js'

const index = async(req, res, next) => {
    let tags = await tagService.getTags();

    if(tags) {
        Msg(res, "All Tags", tags);
    } else {
        next(new Error("Something went wrong"));
    }
}

const store = async(req, res, next) => {
    const {name} = req.body;

    let tag = await tagService.getByName(name.toLowerCase());
    if (tag) {
        next(new Error('Tag already exists'));
    } else {
        let result = await tagService.storeTag(name.toLowerCase());
        Msg(res, "Tag created", result);
    }
}

const getTag = async(req, res, next) => {
    const {id} = req.params;
    let tag = await tagService.getById(id);
    if (tag) {
        Msg(res, "Single Tag", tag)
    } else {
        next(new Error('Tag not found'));
    }
}

const update = async(req, res, next) => {
    const {id} = req.params;
    const payload = req.body;
    let tag = await tagService.getById(id);

    if (tag) {
        let result = await tagService.update(tag._id, payload);
        Msg(res, "Tag updated", result);
    } else {
        next(new Error('Tag not found'));
    }
}

const drop = async(req, res, next) => {
    const {id} = req.params;
    let tag = await tagService.getById(id);
    if (tag) {
        let result = await tagService.drop(id);
        Msg(res, "Tag dropped", result);
    } else {
        next(new Error('Tag not found'));
    }
}

export default {
    index,
    store,
    getTag,
    update,
    drop,
}