import { categoryService, Msg, deleteFileWithLink } from '../utils/facades.js'

const index = async(req, res, next) => {
    let categories = await categoryService.getCategories();

    Msg(res, 'All Categories', categories);
}

const store = async(req, res, next) => {
    let {name, image, description} = req.body;

    let category = await categoryService.getByName(name);
    if (category) {
        next(new Error("Category already exists"));
    } else {
        let result = await categoryService.storeCategory(name, image, description);
        Msg(res, "Category created", result);
    }
}

const update = async(req, res, next) => {
    let id = req.params.id;
    let payload = req.body;

    let category = await categoryService.getById(id);
    if(category) {
        let result = await categoryService.updateCategory(id, payload);
        Msg(res, "Category updated", result);
    } else {
        next(new Error("Category not found"));
    }
}

const drop = async(req, res, next) => {
    let id = req.params.id;
    let category = await categoryService.getById(id);

    if(category) {
        await deleteFileWithLink(category.image);
        let result = await categoryService.drop(id);
        Msg(res, "Category dropped", result);
    } else {
        next(new Error('Category not found'));
    }
}

export default {
    index,
    store,
    update,
    drop,
}