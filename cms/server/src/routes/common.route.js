const express = require('express');
const multer = require('multer');
const commonRouter = express.Router();
var imgName = '';
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename:  (req, file, cb) => {
        if(file) {
            const name = Date.now() + '-' + file.originalname;
            imgName = name;
            cb(null, name);
        }
    }
})
const upload = multer({ storage: storage }).single('file')
commonRouter.post('/upload',(req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }else{
            return res.status(200).json({ok:true, imageName:imgName});
        }
    });

});

module.exports = commonRouter;