import {Mongo, Schema} from './db.js'

const TagSchema = new Schema({
    name: {type: String, unique: true, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Tag = Mongo.model("tags", TagSchema);

export default Tag;