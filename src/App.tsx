import { useState, useEffect } from 'react';
import { connectToServer, getSocket } from './utils/socket-client';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    // Recuperar el token desde el localStorage al cargar el componente
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setJwtToken(storedToken);
      connectToServer(storedToken);
    }
  }, []);

  const handleConnect = () => {
    if (jwtToken.trim().length <= 0) {
      return alert('Enter a valid JWT');
    }

    // Almacenar el token en localStorage antes de conectar al servidor
    localStorage.setItem('jwtToken', jwtToken.trim());

    // Conectar al servidor con el token
    connectToServer(jwtToken.trim());
  };

  // Escuchar el evento 'client-connected' para actualizar el localStorage
  useEffect(() => {
    const handleClientConnected = (data: { token: string }) => {
      localStorage.setItem('jwtToken', data.token);
    };

    const socket = getSocket();

    // Verificar que socket esté definido antes de suscribirse al evento
    if (socket) {
      // Escuchar el evento al montar el componente
      socket.on('client-connected', handleClientConnected);

      // Limpiar el event listener al desmontar el componente
      return () => {
        socket.off('client-connected', handleClientConnected);
      };
    }
  }, []);

  return (
    <div>
      <h2>Websocket - Client</h2>
      <input id="jwt-token" placeholder="Json Web Token" value={jwtToken} onChange={(e) => setJwtToken(e.target.value)} />
      <button id="btn-connect" onClick={handleConnect}>
        Connect
      </button>

      <br />
      <span id="server-status">offline</span>

      <ul id="clients-ul"></ul>

      <form id="message-form">
        <input placeholder="message" id="message-input" />
      </form>

      <h3>Messages</h3>
      <ul id="messages-ul"></ul>
      <Link to="/view">IR A view</Link>
    </div>
  );
};

export default App;
