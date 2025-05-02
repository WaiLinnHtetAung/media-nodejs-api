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

export default {register, login}