import Redis from "ioredis";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const redis = new Redis();

export const RDB = {
    set: async(key, value) => await redis.set(key, JSON.stringify(value)),
    get: async(key) => {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    },
    del: async(key) => await redis.del(key),
    keys: async(pattern) => await redis.keys(pattern.toString()),
}

export const Encoder = {
    encode: (password) => bcrypt.hashSync(password, 10),
    compare: (plain, hash) => bcrypt.compareSync(plain, hash),
}

export const TOKEN = {
    makeToken: payload => JWT.sign({id: payload}, process.env.SECRET_KEY, {expiresIn: '1h'}),
}

export const Msg = (res, msg = '', result= {}) => {
    res.status(200).json({ok: true, msg, result});
}

export const genRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}