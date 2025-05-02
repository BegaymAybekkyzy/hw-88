import multer from "multer";
import path from "node:path";
import config from "../config";
import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";

const imageStorage = multer.diskStorage({
    destination: async (_req, _file, callback) => {
        const destDir = path.join(config.publicPath, "images");
        await fs.mkdir(destDir, {recursive: true});
        callback(null, destDir)
    },
    filename: (_req, file, callback) => {
        const extension = path.extname(file.originalname);
        callback(null, randomUUID() + extension);
    }
});

export const imagesUpload = multer({storage: imageStorage});