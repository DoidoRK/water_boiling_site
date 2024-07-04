import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.15.5:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setLoading(false);
      setConnected(true);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Home Page</Typography>
      {connected ? (
        <Typography variant="body1">Connected to WebSocket server.</Typography>
      ) : (
        <Typography variant="body1">Failed to connect to WebSocket server.</Typography>
      )}
    </div>
  );
};

export default Home;