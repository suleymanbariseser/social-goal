import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/config/db/schema/*',
  connectionString: process.env.DB_URL,
  out: './drizzle',
} satisfies Config;
