import User from '../models/User.js'

const userService = {
    getByName: async(name) => {
        let user = User.findOne({name});
        return user;
    },

    getByPhone: async(phone) => {
        let storedPhone = User.findOne({phone});
        return storedPhone;
    },

    storeUser: async(name, displayName, phone,password, profile) => {
        let result = await new User({name, displayName, phone, password, profile}).save();
        return result;
    }
}

export default userService;