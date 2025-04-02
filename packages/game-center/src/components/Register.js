import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Şifreyi SHA-256 ile hash'lemek için fonksiyon
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  // Kayıt formunun submit fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Şifreler birbirini tutmuyor!");
      return;
    }

    const hashedPassword = hashPassword(password);

    try {
      const response = await axios.post("http://localhost:5001/register", {
        email: email,
        password: hashedPassword,
      });

      alert(response.data.message);
      navigate("/login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        "Kayıt hatası: " +
          (err.response?.data?.message ||
            err.message ||
            "Bilinmeyen bir hata oluştu.")
      );
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autocomplete="username"
          />
        </div>
        <div>
          <label>Şifre</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="new-password"
          />
        </div>

        <div>
          <label>Şifreyi Tekrarla</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
