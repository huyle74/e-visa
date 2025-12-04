import dotenv from "dotenv";
import { PrismaClient } from "@/generate/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

dotenv.config();
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

export default prisma;
