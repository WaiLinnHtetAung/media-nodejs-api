import Redis from "ioredis";
import bcrypt from "bcryptjs";

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

export const genRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}