import {config} from 'dotenv';
import path from 'path';

type TypeMode = 'development' | 'production' | 'test';
const mode : TypeMode = process.env.NODE_ENV as TypeMode || 'development';
if(!['development', 'production', 'test'].includes(mode)) {
    throw new Error('Invalid mode');
}

const envFile = `.env.${mode}`;
config({ path: path.join(__dirname,'environments', envFile) });

export const {
    PORT,
    NODE_ENV,
    BASE_URL,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
    INIT_PASSWORD
} = process.env;

export default {
    db : {
        host: DB_HOST || 'localhost',
        port: DB_PORT || 3306,
        username: DB_USERNAME || 'root',
        password: DB_PASSWORD || '',
        name: DB_NAME || 'test',
        dialect: DB_DIALECT || 'mysql'
    }
}

