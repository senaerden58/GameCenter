const express = require("express");
const router = express.Router();
const pool = require("../models/db");

// Tüm oyunları listele
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM games");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server hatası");
  }
});

// Yeni oyun ekle
router.post("/", async (req, res) => {
  try {
    const { name, players } = req.body;
    const result = await pool.query(
      "INSERT INTO games (name, players) VALUES ($1, $2) RETURNING *",
      [name, players]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server hatası");
  }
});

module.exports = router;
