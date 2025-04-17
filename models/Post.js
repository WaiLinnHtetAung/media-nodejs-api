import {Mongo, Schema} from "./db.js"

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    images: {type: [String], default: []},
    category: {type: Schema.Types.ObjectId, required: true, ref: "categories"},
    tag: {type: Schema.Types.ObjectId, required: true, ref: "tags"},
    author: {type: Schema.Types.ObjectId, required: true, ref: "users"},
    likes: {type: Number, default: 0},
    views: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
})

const Post = Mongo.model("posts", PostSchema);

export default Post;