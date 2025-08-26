import multer from "multer";
import path from "path";
import fs from "fs";

const MAX_MB = 1024 * 1024 * 3;
const ALLOWED = ["image/jpeg", "image/png", "application/pdf"];
const document = [
  "BIODATA",
  "PHOTOGRAPH",
  "CURRENT_LOCATION",
  "BOOKING_CONFIRMATION",
  "PROOF_OF_ACCOMMODATION",
  "FINANCIAL_EVIDENCE",
];

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
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

export const uploadDisk = multer({
  storage: diskStorage,
  fileFilter,
  limits: { fileSize: MAX_MB },
});
export const uploadMemory = multer({ storage: memoryStorage, fileFilter });
