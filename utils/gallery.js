import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';

const genFileName = (filename) => (new Date().valueOf() + '_' + filename).replace(/\s/g, '_');

const genSavePath = (filename) => {
    let fullFilePath = fileURLToPath(import.meta.url);
    return dirname(fullFilePath) + '/../public/images/' + filename;
}

const getImageLink = (filename) => process.env.IMG_PATH + filename;

const saveFile = (file) => {
    let filename = genFileName(file.name);
    let filepath = genSavePath(filename);
    file.mv(filepath);

    return getImageLink(filename);
}

export const saveSingleFile = async (req, res, next) => {
    if(req.files) {
        if(req.files.file) {
            let file = req.files.file;
            req.body.image = saveFile(file);
            next();
        }else {
            next (new Error('File not found'));
        }
    } else {
        next();
    }
}

export const saveMultipleFiles = async (req, res, next) => {
    let images = [];

    if(req.files && req.files.files) {
        req.files.files.forEach((file) => {
            let savedFile = saveFile(file);
            images.push(savedFile);
        })

        req.body.images = images;
        next();
    } else {
        next(new Error('File not found'));
    }
}

export const deleteFileWithName = async(name) => {
    let filePath = genSavePath(name);

    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

export const deleteFileWithLink = async(link) => {
    // 127.0.0.1:3000/images/file_name.png
    let pathArray = link.split('/');
    let name = pathArray[pathArray.length - 1];

    await deleteFileWithName(name);
}