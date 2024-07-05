import { useState, useEffect, useCallback, useRef } from 'react';
import { DataPacket } from '../types';
import { webSocketAddress } from '../config';

const useWebSocket = () => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(webSocketAddress);
    socketRef.current = socket;

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
      console.log(message);
    };

    return () => {
      socket.close();
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