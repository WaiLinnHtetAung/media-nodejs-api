import {Msg, userService, Encoder, TOKEN} from '../utils/facades.js'
import req from "express/lib/request.js";
import user from "../models/User.js";

const register = async(req, res, next) => {
    let {name, displayName, phone, password} = req.body;
    name = name?.toLowerCase()

    const storedUser = await userService.getByName(name);
    const storedPhone = await userService.getByPhone(phone);

    if(storedUser){
        next(new Error('User already exists'));
        return;
    }

    if(storedPhone){
        next(new Error('Phone already exists'));
        return;
    }

    password = Encoder.encode(password);

    let profile = process.env.IMG_PATH + '1.png';

    let user = await userService.storeUser(name, displayName, phone, password, profile);

    Msg(res, "Register successfully.", user);
}

const login = async (req, res, next) => {
    let {name, password} = req.body;
    name = name?.toLowerCase()

    const storedUser = await userService.getByName(name);

    if(!storedUser || !Encoder.compare(password, storedUser.password)){
        next(new Error('Credentials did not match'));
        return;
    }

    await userService.setCacheUser(storedUser._id.toString());

    let token = TOKEN.makeToken(storedUser._id.toString());

    Msg(res, "Login successfully.", token);
}

const getUsers = async(req, res, next) => {
    let pageIndex = req.params.pageIndex;
    let users = await userService.getUsers(pageIndex);

    Msg(res, `Page Index ${pageIndex}`, users);
}

const getUser = async (req, res, next) => {
    let userId = req.params.id;
    let user = await userService.getById(userId);

    Msg(res, `Single user`, user);
}

const changeRole = async (req, res, next) => {
    const {userId, role} = req.body;
    const user = await userService.getById(userId);

    if(user) {
        await userService.chnageRole(user._id, role)
    } else {
        next(new Error("No user with that id"));
    }
}

export default { register, login, getUsers, getUser }