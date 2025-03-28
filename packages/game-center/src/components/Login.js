// Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sha256 } from 'crypto-js';  // SHA-256 şifreleme için bir kütüphane kullanabilirsiniz.

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    const hashedPassword = sha256(password).toString();
    // Backend'e istek gönderme ve token alma işlemi burada yapılır.
    // Eğer başarılı ise:
    localStorage.setItem('token', 'your-generated-token');
    history.push('/biometric-login');
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      <a href="/forgot-password">Forgot Password?</a>
      <label>
        <input type="checkbox" /> Remember Me
      </label>
    </div>
  );
};

export default Login;
