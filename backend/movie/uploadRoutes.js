import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs"; // Import fs for checking existing files

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Correct absolute path
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// File Filter for Images Only
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetypes = /image\/jpeg|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase().slice(1);
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only (JPEG, PNG, WEBP allowed)"), false);
  }
};

// Initialize Multer Upload
const upload = multer({ storage, fileFilter });

const uploadSingleImage = upload.single("image");

// Upload Route
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (req.file) {
      return res.status(200).json({
        message: "Image uploaded successfully",
        image: `/uploads/${req.file.filename}`, // Ensure correct path
      });
    }
    res.status(400).json({ message: "No image provided" });
  });
});

export default router;
