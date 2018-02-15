var multer = require('multer');
var router = require('express').Router();
var path = require("path");
var uuid = require("node-uuid");


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, "../assets/uploads"));
    },
    filename(req, file, cb) {
        cb(null, `${uuid.v1()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {

    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..

    res.json({ 'success': true, 'data': { file, meta } })
});

module.exports = router;