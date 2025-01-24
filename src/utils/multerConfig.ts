import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(process.cwd(), "public/profilepic/users");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
  console.log(`Directory created: ${uploadDirectory}`);
} else {
  console.log(`Directory already exists: ${uploadDirectory}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Uploading to directory: ${uploadDirectory}`);
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    console.log("Processing file:", file.originalname);

    try {
      const date = new Date().toLocaleDateString('en-GB').replace(/\//g, "-"); // Format date
      const ext = path.extname(file.originalname); // Get the file extension
      const username = req.body.username || req.query.username; // Extract username from body or query

      console.log("Extracted details:", { date, ext, username });

      if (!username) {
        console.error("Error: Username is missing.");
        return cb(new Error("Username is required for naming the file."));
      }

      const fileName = `${username}-${date}${ext}`; // Construct the file name
      console.log(`Generated file name: ${fileName}`);
      cb(null, fileName); // Save the file with the generated name
    } catch (error) {
      console.error("Error generating file name:", error);
      cb(error); // Error handling
    }
  },
});

// Configure multer with file size limit and allowed mime types
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
  },
  fileFilter: (req, file, cb) => {
    console.log(`Validating file type: ${file.mimetype}`);
    
    const allowedMimeTypes = ["image/jpeg", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      console.log("File type is valid.");
      cb(null, true);
    } else {
      console.error("Invalid file type:", file.mimetype);
      cb(new Error("Invalid file type. Only JPEG and JPG are allowed."));
    }
  },
});

export default upload;
