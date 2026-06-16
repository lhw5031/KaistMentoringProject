import express from "express";
import db, { initDb } from "./db.js";

const app = express();
const PORT = 3000;

initDb((err) => {
  if (err) {
    console.error("Failed to initialize DB", err);
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});

app.get("/", (req, res) => {
  res.send("홈 화면");
});

app.get("/memos", (req, res) => {
  res.json([
    { id: 1, content: "첫 메모" },
    { id: 2, content: "둘째 메모" },
  ]);
});
