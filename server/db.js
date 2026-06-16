import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./server/data/data.db");

export function initDb(callback) {
  db.run(
    `CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      pinned INTEGER DEFAULT 0,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    callback,
  );
}

export default db;
