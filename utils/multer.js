const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadDir = path.join(__dirname, '../public/uploads');

try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (error) {
    console.error('Error creating upload directory:', error);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}_${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        const error = new Error('Invalid file format: Images only!');
        error.status = 400;
        cb(error, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: process.env.MAX_FILE_SIZE || 2 * 1024 * 1024 }
});

module.exports = upload;
