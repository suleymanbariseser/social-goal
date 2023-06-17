import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const client = postgres(process.env.DB_URL!);

migrate(drizzle(client), { migrationsFolder: 'drizzle' });

export const db = drizzle(client);
