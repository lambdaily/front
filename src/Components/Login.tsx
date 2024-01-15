// Login.tsx

import React, { useState } from 'react';
import { connectToServer } from '../utils/socket-client';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConnectClick = async () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      alert('Enter a valid email and password');
      return;
    }

    try {
      // Enviar la solicitud al servidor para autenticar
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        // Manejar errores de autenticación
        alert('Authentication failed');
        return;
      }

      const data = await response.json();
      const receivedToken = data.token;

      // Conectar al servidor con el token obtenido
      connectToServer(receivedToken);

      // Almacenar el token en el estado local
      setToken(receivedToken);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button onClick={handleConnectClick}>Connect</button>

      {/* Muestra el token si está disponible */}
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default Login;
