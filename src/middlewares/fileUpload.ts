import multer from "multer";
import path from "path";

// multer library untuk middelware upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/uploads"));
  },
  filename: function (req, file, cb) {
    // if (file.fieldname.split(".")[1].match() ) {

    // }
    const uniqueSuffix = Date.now() + "-";
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
