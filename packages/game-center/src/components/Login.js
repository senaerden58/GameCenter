import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';  
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // SHA-256 ile şifreyi hash'lemek için fonksiyon
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  // Giriş formunun submit fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Şifreyi hash'le
    const hashedPassword = hashPassword(password);

    try {
      // Şifreyi ve email'i sunucuya gönder
      const response = await axios.post('http://localhost:5001/login', {
        email: email,
        password: hashedPassword
      });

      alert(response.data.message); // Giriş başarılı mesajı
   
      navigate("/");
      // Başarıyla giriş yaptıktan sonra, kullanıcı token'ını saklayabilirsiniz
      localStorage.setItem('userToken', response.data.token); 
    } catch (err) {
      console.error(err);
      setError('Giriş hatası: ' + (err.response?.data?.message || 'Bilinmeyen bir hata oluştu.'));
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
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
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
