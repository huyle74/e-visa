import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import type { PrismaConfig } from "prisma";

type Env = {
  DATABASE_URL: string;
};

export default defineConfig({
  schema: "src/prisma/schema",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env<Env>("DATABASE_URL"),
  },
}) satisfies PrismaConfig;
