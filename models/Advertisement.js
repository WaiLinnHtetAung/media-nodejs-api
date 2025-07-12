import {Mongo, Schema} from './db.js'

const AdvertisementSchema = new Schema({
    image: {type: String, required: true},
    content: {type: String, required: true},
    status: {type: String, enum: ["PROCESSING", "ACTIVE", "IDEL"], default: "PROCESSING"},
    createdAt: {type: Date, default: Date.now},
})

const Advertisement = Mongo.model("advertisements", AdvertisementSchema);

export default Advertisement