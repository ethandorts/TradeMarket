import path from 'path';
import express from 'express';
import multer from 'multer';

const Router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only to be uploaded');
    }
}

const upload = multer({
    storage,
});

Router.post('/', upload.single('image'), (req,res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`,
    });
});

export default Router;
