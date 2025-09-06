import multer from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

const MAX_MB = 1024 * 1024 * 5;
const ALLOWED = ["image/jpeg", "image/png", "application/pdf"];
const document = [
  "BIODATA",
  "PHOTOGRAPH",
  "CURRENT_LOCATION",
  "BOOKING_CONFIRMATION",
  "PROOF_OF_ACCOMMODATION",
  "FINANCIAL_EVIDENCE",
];

const uploadDir = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const checkExistedFile = async (dir: string, prefix: string) => {
  try {
    const names = await fs.promises.readdir(dir, { withFileTypes: true });

    const result = names
      .filter(({ name }, i) => {
        return name.startsWith(prefix);
      })
      .map(({ name }) => {
        return path.join(uploadDir, name);
      });
    await Promise.all(
      result.map((file) => {
        return fs.promises.unlink(file);
      })
    );
    return result;
  } catch (err: any) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const diskStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, uploadDir);
  },
  filename: async (req: Request, file, cb) => {
    try {
      const { applicationId, section = "none" } = req.query;
      const fieldName = file.fieldname;
      const filename = fieldName + "-" + section + "-" + applicationId;

      fs.promises
        .mkdir(uploadDir, { recursive: true })
        .then(() =>
          checkExistedFile(
            uploadDir,
            `${fieldName + "-" + section + "-" + applicationId}`
          )
        )
        .then(() => cb(null, filename + "-" + file.originalname))
        .catch((err) => cb(err, ""));
    } catch (error) {
      cb(error as Error, "");
    }
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!ALLOWED.includes(file.mimetype)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const memoryStorage = multer.memoryStorage();

export const receiveFiles = multer({
  storage: diskStorage,
  fileFilter,
  limits: { fileSize: MAX_MB },
});
export const uploadMemory = multer({ storage: memoryStorage, fileFilter });

export const uploadDisk = multer({
  storage: diskStorage,
});
