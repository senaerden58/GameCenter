import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';  // crypto-js paketini import ettik

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde, eğer daha önce giriş yapılmışsa token'ı kontrol et
    const token = localStorage.getItem('token');
    if (token) {
      // Eğer token varsa, otomatik giriş yapılabilir
      console.log("Token bulundu:", token);
      // Burada token doğrulama yapılabilir
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifreyi SHA-256 ile şifrele (crypto-js kullanarak)
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: hashedPassword
      });

      if (response.data.token) {
        // Beni Hatırla seçeneği aktifse token'ı localStorage'a kaydet
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
        }

        alert('Giriş başarılı!');
        // Kullanıcıyı ana sayfaya yönlendirebilirsiniz
      }
    } catch (err) {
      console.error(err);
      alert('Giriş hatası: ' + err.response?.data?.error || 'Bilinmeyen bir hata oluştu');
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Şifre</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <input 
            type="checkbox" 
            checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)} 
          />
          <label>Beni Hatırla</label>
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
