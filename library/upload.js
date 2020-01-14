var multer = require('multer');
var path = require('path');
var fileType = require('file-type');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/upload');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname);
    }

});

var uploadPicture = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(req);
        const type = file.mimetype;
        console.log(type);
        if ((type == 'text/plain') || (type=='application/octet-stream')) {
            cb(null, true)
        } else {
            cb(null, false)
            // cb(new Error('I don\'t have a clue!'))
        }
    }

}).array('files', 2);

module.exports = {
    saveFilesPictures: function (req, res, callback) {
        uploadPicture(req, res, function (err) {
            if (err) {
                console.log(err)
                if (err.code) {
                    let response = {
                        "status" : false,
                        "error_message":"file can't be empty"
                    }
                    callback(response);

                } else {
                    let response = {
                        "status" : false,
                        "error_message":"file extension must be .jpg or .jpeg"
                    }
                    callback(response);

                }
            } else {
                if (req.files == '') {
                    let response = {
                        "status" : false,
                        "error_message":"file can't be empty"
                    }
                    callback(response);
                } else {
                    var sts = true
                    var msg = 'Success Uploading';
                    var files = req.files;
                    var image = []
                    if(files){
                        files.forEach(function (item, index) {
                            var imagedata = {
                                'imagename': item.originalname,
                                'path': item.path
                            };
                            image.push(imagedata);
                        });
                        var callbackNya = {
                            "status": sts,
                            "message": msg,
                            "result" : files[0]
    
                        }
                        callback(callbackNya)
                    }else{
                        let response = {
                            "status" : false,
                            "error_message":"file can't be empty"
                        }
                        callback(response);
                    }

                }
            }

        });
    }
};