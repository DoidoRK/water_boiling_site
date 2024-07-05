import { useState, useEffect, useCallback, useRef } from 'react';
import { DataPacket } from '../types';
import { webSocketCmdAddress } from '../config';

const useWebSocket = () => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const commandSocket = new WebSocket(webSocketCmdAddress);
    socketRef.current = commandSocket;

    commandSocket.onopen = () => {
      console.log('Connected to WebSocket server');
      setLoading(false);
      setConnected(true);
    };

    commandSocket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setLoading(false);
      setConnected(false);
    };

    commandSocket.onmessage = (message) => {
      console.log(message);
    };

    return () => {
      commandSocket.close();
    };
  }, []);

  const sendWebSocketData = useCallback((data: DataPacket) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open');
    }
  }, []);

  return { loading, connected, sendWebSocketData };
};

export default useWebSocket;