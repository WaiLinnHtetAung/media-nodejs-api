import { categoryService, Msg } from '../utils/facades.js'

const index = async(req, res, next) => {
    let categories = await categoryService.getCategories();

    Msg(res, 'All Categories', categories);
}

const store = async(req, res, next) => {
    let {name, image, description} = req.body;

    let result = await categoryService.storeCategory(name, image, description);

    Msg(res, "Category created", result);
}

export default {
    index,
    store,
}