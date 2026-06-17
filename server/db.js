import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB 파일 경로 지정
const dbPath = path.resolve(__dirname, "data.db");
const db = new sqlite3.Database(dbPath);

export default db;
