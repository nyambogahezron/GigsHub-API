const multer = require("multer");

const { v4: uuidv4 } = require('uuid'); 

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/images"); 
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4(); 
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage });

