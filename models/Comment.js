import {Mongo, Schema} from "./db.js"

const CommentSchema = new Schema({
    postId: {type: Schema.Types.ObjectId, ref: 'posts', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    content: {type: String, required: true},
    image: {type: String, default: ""},
    status: {type: String, enum: ["PROCESSING", "ACCEPTED", "DENY"], default: "PROCESSING"},
    createdAt: {type: Date, default: Date.now},
})

const Comment = Mongo.model("comments", CommentSchema);

export default Comment