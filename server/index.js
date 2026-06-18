import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

// 1. 절대 경로 설정을 위한 변수 고정 (경로 꼬임 방지)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 2. 프론트엔드에서 보내는 JSON 데이터를 받기 위한 필수 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. 정적 파일 제공 (index.html이 있는 public 폴더 연결)
app.use(express.static(path.join(__dirname, "../public")));

// 👇👇👇 이 부분을 추가하세요! 👇👇👇
// 사용자가 메인 주소('/')로 접속하면 public 폴더의 index.html을 보여줌
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 4. DB 파일 경로를 현재 폴더(server/) 안의 'data.db'로 확실하게 지정 (SQLITE_CANTOPEN 해결)
const dbPath = path.join(__dirname, "data.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB 연결 실패:", err.message);
  } else {
    console.log("✅ DB 연결 성공:", dbPath);
  }
});

// 5. 이력서용 테이블 초기화 (index.html 구조와 일치시킴)
db.run(
  `CREATE TABLE IF NOT EXISTS resume_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL, 
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) {
      console.error("❌ 테이블 생성 실패:", err.message);
    } else {
      console.log("✅ resume_items 테이블 준비 완료");
    }
  },
);

// ==========================================
// 6. 핵심 기능: CRUD API 라우터
// ==========================================

// [READ] 모든 이력서 데이터 가져오기
app.get("/api/resume", (req, res) => {
  db.all("SELECT * FROM resume_items ORDER BY id ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// [CREATE] 새로운 이력서 항목 추가하기 (자기소개, 연락처, 기술스택 공용)
app.post("/api/resume", (req, res) => {
  const { category, content } = req.body;
  if (!category || !content) {
    return res.status(400).json({ error: "분류와 내용을 모두 입력해주세요." });
  }

  db.run(
    "INSERT INTO resume_items (category, content) VALUES (?, ?)",
    [category, content],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, category, content });
    },
  );
});

// [UPDATE] 이력서 항목 내용 수정하기
app.put("/api/resume/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  db.run(
    "UPDATE resume_items SET content = ? WHERE id = ?",
    [content, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "수정 완료" });
    },
  );
});

// [DELETE] 이력서 항목 삭제하기
app.delete("/api/resume/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM resume_items WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "삭제 완료" });
  });
});

// 7. 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 정상적으로 작동합니다! http://localhost:${PORT}`);
});
