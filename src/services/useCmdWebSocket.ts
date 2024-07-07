import { useState, useEffect, useCallback, useRef } from 'react';
import { DataPacket } from '../types';
import { webSocketCmdAddress } from '../config';

const useCmdWebSocket = () => {
  const [cmdSocketconnected, setCmdSocketConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const commandSocket = new WebSocket(webSocketCmdAddress);
    socketRef.current = commandSocket;

    commandSocket.onopen = () => {
      console.log('Connected to WebSocket server');
      setCmdSocketConnected(true);
    };

    commandSocket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setCmdSocketConnected(false);
    };

    commandSocket.onmessage = (message) => {
      console.log(message);
    };

    return () => {
      commandSocket.close();
    };
  }, []);

  const sendCmdWebSocketData = useCallback((data: DataPacket) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open');
    }
  }, []);

  return { cmdSocketconnected, sendCmdWebSocketData };
};

export default useCmdWebSocket;