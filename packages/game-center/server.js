import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';  // SHA-256 için bcrypt kullanabiliriz
import crypto from 'crypto';    // SHA-256 şifreleme için crypto modülü

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL bağlantısını ayarla
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gameCenter", // Veritabanı adını buraya yaz
  password: "0605", // PostgreSQL şifreniz
  port: 5432, // Default PostgreSQL portu
});

// Giriş işlemi - email ve şifre kontrolü
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Veritabanında kullanıcıyı bul
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Kullanıcı bulunamadı' });
    }

    const user = result.rows[0];

    // Şifreyi SHA-256 ile kontrol et
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    
    if (hash !== user.password) {
      return res.status(400).json({ error: 'Yanlış şifre' });
    }

    // Token oluştur (JWT veya benzeri)
    const token = crypto.randomBytes(64).toString('hex'); // Bu basit bir token
    await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);

    res.json({ message: 'Giriş başarılı', token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
