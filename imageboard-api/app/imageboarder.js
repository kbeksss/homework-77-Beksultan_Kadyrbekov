const express = require('express');
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');

const fileDb = require('../fileDb');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const threads = await fileDb.getAllThreads();
    res.send(threads);
});
router.post('/', upload.single('image'), async (req, res) => {
    const thread = req.body;
    if(req.file){
        thread.image = req.file.filename;
    }
    if(!thread.author){
        thread.author = 'Anonymous';
    }
    if(!thread.description){
        return res.status(404).send({error: 'Enter your description'})
    }
    await fileDb.addThread(thread);
    res.send(thread.id);
});
module.exports = router;
