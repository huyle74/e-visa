import crypto from "crypto";
import fs from "fs/promises";
import { hostingRoot } from "@/config/envLoader";
import { supportingDocumentRepos } from "@/repositories/visaApplication.repository";
import userRepos from "@/repositories/user.repository";

const supportingDocumentService = async (
  userId: string,
  files: Express.Multer.File[],
  applicationId: string
) => {
  const checkUser = await userRepos.findOne(userId);
  if (!checkUser) throw new Error("User doesn't exist");

  const result = Object.values(files).map(async (file: any) => {
    const { path, filename, fieldname, size, mimetype, originalname } = file[0];

    // SHA256
    const buf = await fs.readFile(path);
    const sha256 = crypto.createHash("sha256").update(buf).digest("hex");

    const fileUrl = `${hostingRoot}/uploads/${filename}`;

    const final = {
      applicationId,
      type: fieldname,
      sha256,
      fileUrl,
      meta: { source: "web" },
      mimeType: mimetype,
      originalName: originalname,
      sizeBytes: size,
      storageKey: path,
    };

    const update = await supportingDocumentRepos.upsert(final);
    return update;
  });
  return Promise.all(result);
};
export default supportingDocumentService;
