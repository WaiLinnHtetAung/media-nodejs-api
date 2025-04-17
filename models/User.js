import {Mongo, Schema} from './db.js'

const UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    displayName: {type: String, required: true},
    role: {type: Number, default: 2},
    profile: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

UserSchema.index({name: 1})

const User = Mongo.model("users", UserSchema);

export default User