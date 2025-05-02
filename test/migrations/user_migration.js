import User from '../../models/User.js'
import {Encoder} from "../../utils/utils.js";

const migrateAdmin  = async () => {
    let adminData = {
        name: "admin",
        displayName: "Admin",
        phone: "0123456789",
        password: Encoder.encode("password"),
        role: 0,
        profile: process.env.IMG_PATH + '1.png'
    }

    let result = await  new User(adminData).save();
    console.log("Admin created successfully.", result);
}

const migrate = async () => {
    await migrateAdmin();
}

export default {migrate}