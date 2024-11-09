import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); 
    const extname = path.extname(file.originalname); 
    const newFilename = `${timestamp}${extname}`;  
    cb(null, newFilename); 
  },
});

export const uploads = multer({ storage: storage });
