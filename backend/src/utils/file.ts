import fs from "fs";

import { access } from "node:fs/promises";
import { constants } from "node:fs";

export async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch (e: any) {
    if (e.code === "ENOENT") return false; // <- what you want
    throw e; // other errors should bubble
  }
}
    
export const fileConvert = async (file: any) => {
  if (!file) return null;
  const { path, originalname, mimetype } = file;
  try {
    const checkFile = await fileExists(path)
    console.log(checkFile);
    
    const getFile = fs.readFileSync(path);
    console.log("\nWe here---", getFile);
    if (!getFile) return null;
    return {
      data: getFile.toString("base64"),
      name: originalname,
      type: mimetype,
    };
  } catch (error) {
    console.error(`Failed to read file: ${path}`, error);

    return null;
  }
};
  