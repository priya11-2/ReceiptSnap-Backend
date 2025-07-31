import express from "express";
import { upload } from "../utils/multer";
import { AuthMiddleware } from "../middlewares/auth";
import { deleteFile } from "../modules/file/deleteFile";
import { uploadFile } from "../modules/file/uploadFile";
import { getDashboardContent } from "../modules/file/DashboardController";

const fileRouter = express.Router();

fileRouter.post("/upload", AuthMiddleware, upload.single("file"), uploadFile);
fileRouter.get("/dashboard", AuthMiddleware, getDashboardContent);
fileRouter.delete("/:id", AuthMiddleware, deleteFile);

export default fileRouter