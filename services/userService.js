import User from '../models/User.js'
import {RDB} from '../utils/utils.js'

const getById = async(id) => {
    let user = await User.findById(id).select('-password');
    return user;
}

const getByName = async(name) => {
    let user = await User.findOne({name});
    return user;
}

const getByPhone = async(phone) => {
    let storedPhone = User.findOne({phone});
    return storedPhone;
}

const storeUser = async(name, displayName, phone,password, profile) => {
    let result = await new User({name, displayName, phone, password, profile}).save();
    return result;
}

const setCacheUser = async(key) => {
    let user = await getById(key);
    await RDB.set(key, user);
}

const getCacheUser = async(key) => {
    let user = await RDB.get(key);
    return user;
}

const getUsers = async(pageIndex) => {
    let perPage = 10;

    // get with pagination
    await User.find().skip(pageIndex * perPage).sort({createdAt: -1}).limit(perPage);
}

const chnageRole = async(id, role) => {
    await User.findByIdAndUpdate(id, {role})
}

export default {getById, getByName, getByPhone, storeUser, setCacheUser, getCacheUser, getUsers, chnageRole};