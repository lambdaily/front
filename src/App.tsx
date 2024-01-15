// src/App.tsx
import React, { useState } from 'react';
import { connectToServer } from './utils/socket-client';

const App: React.FC = () => {
  const [jwtToken, setJwtToken] = useState('');

  const handleConnect = () => {
    if (jwtToken.trim().length <= 0) {
      return alert('Enter a valid JWT');
    }

    connectToServer(jwtToken.trim());
  };

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
    </div>
  );
};

export default App;
