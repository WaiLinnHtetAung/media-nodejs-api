import {Msg, userService, Encoder} from '../utils/facades.js'
import req from "express/lib/request.js";

const register = async(req, res, next) => {
    let {name, displayName, phone, password} = req.body;

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

export default {register}