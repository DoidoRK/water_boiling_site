import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { webSocketAddress } from '../config';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(webSocketAddress);

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setLoading(false);
      setConnected(true);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setLoading(false);
      setConnected(false);
    };

    socket.onmessage = (message) => {
      console.log(message)
    }

    return () => {
      socket.close();
    };
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        {connected ? (
          <Typography variant="body1">Connected to WebSocket server.</Typography>
        ) : (
          <Typography variant="body1">Failed to connect to WebSocket server.</Typography>
        )}
      </div>
    );
  }
};

export default Home;