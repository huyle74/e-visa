import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import type { PrismaConfig } from "prisma";

type Env = {
  DATABASE_URL: string;
};

export default defineConfig({
  schema: "src/prisma",
  migrations: {
    path: "prisma/migrations",
    seed:"tsx src/prisma/seed/nationData.ts"
  },
  datasource: {
    url: env<Env>("DATABASE_URL"),
  }, 
}) satisfies PrismaConfig;
