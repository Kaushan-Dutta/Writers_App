const multer = require('multer');
const path=require('path');
  
var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
});
  
module.exports=Storage;