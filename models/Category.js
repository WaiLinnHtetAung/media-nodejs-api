import {Mongo, Schema} from './db.js'

 const CategorySchema = new Schema({
     name: { type: String, required: true, unique: true },
     image: { type: String, required: true },
     description: { type: String, required: true },
     createdAt: {type: Date, default: Date.now},
 })

const Category = Mongo.model("categories", CategorySchema);

 export default Category;