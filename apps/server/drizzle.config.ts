import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: './src/config/db/schema/*',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  out: './drizzle',
} satisfies Config;
