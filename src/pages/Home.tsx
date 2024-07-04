import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import useWebSocket from '../services/webSocketService';

const Home: React.FC = () => {
  const { loading, connected } = useWebSocket();

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