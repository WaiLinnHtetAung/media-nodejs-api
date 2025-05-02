import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userMigration from './migrations/user_migration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.DB_URL);

const test = async () => {
    await userMigration.migrate();
};

test();
