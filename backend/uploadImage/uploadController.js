const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "NO File Uploaded" });
    }

    // Cloudinary automatically handles the upload via Multer
    res.status(200).json({
      imageUrl: req.file.path, //Image url returned by cloudinary
      publicId: req.file.filename, //cloudinary file ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image Upload Failed" });
  }
};

export { uploadImage };
