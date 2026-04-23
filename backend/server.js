const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Library@123",
  database: "library_system"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});


// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.send(err);

    if (result.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});


// ================= BOOKS =================

// Get all books
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// Add book
app.post("/add-book", (req, res) => {
  const { title, author, quantity } = req.body;

  const sql = "INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)";
  db.query(sql, [title, author, quantity], (err, result) => {
    if (err) return res.send(err);
    res.send("Book Added Successfully");
  });
});


// ================= USERS =================
app.get("/users", (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});


// ================= ISSUED BOOKS =================
app.get("/issued", (req, res) => {
  db.query("SELECT * FROM issued_books", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});


// ================= SERVER =================
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
