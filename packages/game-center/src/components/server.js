require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json()); // JSON verileri işlemek için

// PostgreSQL bağlantısını ayarla
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gameCenter", // Kendi database ismini kullan
  password: "0605", // PostgreSQL şifreni gir
  port: 5432, // Default PostgreSQL portu
});

// // Örnek GET isteği: Veritabanından tüm kullanıcıları al
// app.get("/users", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM users"); // "users" tablon olmalı
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Veri alınamadı" });
//   }
// });

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
