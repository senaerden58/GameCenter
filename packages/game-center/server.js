import express from 'express';
import pg from 'pg'; 
import crypto from 'crypto'; 
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors'; // CORS modülünü import ettik

const { Pool } = pg;
const app = express();  
const port = 5001;
;

// CORS middleware'ini uygulamaya ekleyin
app.use(cors({
  origin: 'http://localhost:3000',  // React uygulamanızın çalıştığı URL
  methods: 'GET,POST',
  credentials: true
}));

// PostgreSQL Bağlantı
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gameCenter',
  password: '0605',
  port: 5432,
});

// Body parser ile JSON verisini almak
app.use(bodyParser.json());

// Session konfigürasyonu
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 'secure' özelliği sadece HTTPS bağlantılarında gereklidir.
}));
app.get('/', (req, res) => {
  res.send('Backend çalışıyor!');
});
// SHA-256 şifreleme fonksiyonu
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Kayıt olma (Register) Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Şifreyi hash'leme
  const hashedPassword = hashPassword(password);

  try {
    // Veritabanına kullanıcıyı ekleyin
    const result = await pool.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [email, hashedPassword]);
    res.status(201).json({ message: 'Kayıt başarılı!', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Veritabanı hatası.' });
  }
});

// Giriş Yapma (Login) Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Şifreyi hash'leme
  const hashedPassword = hashPassword(password);

  try {
    // Veritabanındaki kullanıcıyı sorgulama
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, hashedPassword]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'E-posta veya şifre hatalı!' });
    }

    // Kullanıcıyı session'a kaydetme
    req.session.user = { email };

    res.json({ message: 'Giriş başarılı!', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Veritabanı hatası.' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
