import { useState, useEffect } from 'react';
import { serverAddress } from '../config';

const useWebSocket = () => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(serverAddress);
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setLoading(false);
      setConnected(true);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setLoading(false);
      setConnected(false);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return { loading, connected };
};

export default useWebSocket;
