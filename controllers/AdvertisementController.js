import {advertisementService, deleteFileWithLink, Msg} from "../utils/facades.js";

const index = async(req, res, next) => {
    let result = await advertisementService.getAdvs();

    if(result) {
        Msg(res, "advertisement", result);
    } else {
        next(new Error(`something went wrong`));
    }
}

const getActiveAdvs = async(req, res) => {
    let result = await advertisementService.getActiveAdvs();

    if(result) {
        Msg(res, "all active advs", result);
    } else {
        next(new Error(`something went wrong`));
    }
}

const store = async(req, res, next) => {
    let payload = {
        image: req.body.image,
        content: req.body.content,
    }
    let result = await advertisementService.store(payload);

    if (result) {
        Msg(res, "success", result);
    } else {
        next(new Error('Failed to store'));
    }
}

const drop = async(req, res, next) => {
    const {id} = req.params;
    const adv = await advertisementService.getById(id);

    if(adv) {
        await deleteFileWithLink(adv.image)
        await advertisementService.drop(id)
        Msg(res, "success", id);
    } else {
        next(new Error('Failed to drop'));
    }
}

const update = async(req, res, next) => {
    const {id} = req.params;
    const payload = {
        image: req.body.image,
        content: req.body.content,
        status: req.body.status,
    }

    let adv = await advertisementService.getById(id);
    if(adv) {
        if(payload.image) await deleteFileWithLink(adv.image)

        let result = await advertisementService.update(id, payload)
        Msg(res, "success", result)
    } else {
        next(new Error('Adv not found'));
    }
}

export default {
    index,
    getActiveAdvs,
    store,
    drop,
    update,
}