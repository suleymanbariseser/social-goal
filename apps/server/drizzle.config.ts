import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: './src/config/db/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  out: './drizzle',
} satisfies Config;
