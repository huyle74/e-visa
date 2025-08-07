import dotenv from "dotenv";
dotenv.config();

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";
const JWT_PUBLICK_KEY = process.env.JWT_PUBLICK_KEY?.replace(/\\n/g, "\n") || "";

export { JWT_PRIVATE_KEY, JWT_PUBLICK_KEY };
