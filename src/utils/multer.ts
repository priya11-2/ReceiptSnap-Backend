import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";

const localTempUploads = path.join(process.cwd(), "/uploads");

if (!fs.existsSync(localTempUploads)) {
    fs.mkdirSync(localTempUploads, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024 * 1024 // 1 GB
    },
    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {
   
        // Defined allowed MIME types for images and videos
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/bmp",
            "application/pdf"
        ];

        // Defined allowed extensions for additional validation
        const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
            ".bmp",
            ".pdf"
        ];

        // Check MIME type
        const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

        // Check extension for extra safety)
        const isExtValid = allowedExtensions.some((ext) =>
            file.originalname.toLowerCase().endsWith(ext)
        );

        console.log(`Received file: ${file.originalname}, MIME type: ${file.mimetype}`);

        if (isMimeTypeValid && isExtValid) {
            cb(null, true); // Accept the file
        } else {
            const errorMsg = `Invalid file type! Expected image or video, got MIME: ${file.mimetype}, Extension: ${file.originalname}`;
            cb(new Error(errorMsg));
        }
    }
});