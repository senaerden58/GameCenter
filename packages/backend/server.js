// Express modülünü import et
const express = require('express');
const cors = require('cors');
const app = express();

// Port numarasını ayarla
const PORT = 3000;
app.use(cors());
app.use(express.json());
// Basit bir GET route tanımla
app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on port 8000.`);
});