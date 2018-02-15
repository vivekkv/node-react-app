var upload = multer({ dest: path.join(__dirname, '../assets/uploads'), limits: { fileSize: 2000000 } });

function uploadImage(req, res) {

    upload(req, res, function (err) {

        if (err) {
            return res.json({ success: false, message: 'image uploading failed ' });
        }

        return res.json({ success: true, message: 'image uploaded successfully ' });
    });
}

module.exports = {
    uploadImage
}