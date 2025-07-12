import Advertisement from "../models/Advertisement.js";

const getAdvs = async() => {
    let result = null;

    try {
        result = await Advertisement.find();
    } catch (err) {
        console.log(err)
    } finally {
        return result;
    }
}

const getActiveAdvs = async() => {
    let result = null;
    try{
        result = await Advertisement.find({status: 'ACTIVE'});
    } catch (err) {
        console.log(err)
    } finally {
        return result;
    }
}

const getById = async (id) => {
    let result = null;
    try {
        result = await Advertisement.findById(id);
    } catch (err) {
        console.log(err)
    } finally {
        return result;
    }
}

const store = async(payload) => {
    let result = null;
    try {
        result = await new Advertisement(payload).save();
    } catch (e) {
        console.error(e);
    } finally {
        return result;
    }
}

const update = async(id, payload) => {
    let result = null;
    try {
        result = await Advertisement.findByIdAndUpdate(id, payload, {new: true})
    } catch (err) {
        console.log(err)
    } finally {
        return result;
    }
}

const drop = async(id) => {
    let result = null;

    try {
        result = await Advertisement.findByIdAndDelete(id);
    } catch (e) {
        console.error(e);
    } finally {
        return result;
    }
}

export default {
    getAdvs,
    getActiveAdvs,
    getById,
    store,
    update,
    drop
}