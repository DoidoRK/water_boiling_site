import React, { useCallback } from 'react';
import { Typography, CircularProgress, Button } from '@mui/material';
import useWebSocket from '../services/useCmdWebSocket';
import { DataPacket, DeviceType, MessageOp, SystemParams } from '../types';

const Home: React.FC = () => {
  const { loading, connected, sendWebSocketData } = useWebSocket();

  const mockSystemParams: SystemParams = {
    input_valve_flow_speed: 150,
    middle_valve_flow_speed: 150,
    output_valve_flow_speed: 150,
    water_boiling_rate: 150,
    sensor_reading_timer: 100,
    water_tank_water_max_level: 95,
    water_tank_water_min_level: 20,
    boiling_tank_water_max_level: 95,
    boiling_tank_water_min_level: 20,
  };

  const handleSendData = useCallback(() => {
    const newDataPacket: DataPacket = {
      device_type: DeviceType.FRONT_END,
      message_type: MessageOp.SYSTEM_STARTUP,
      system_settings: mockSystemParams,
      sensor_readings: {
        max_sensor_tank1: 0,
        min_sensor_tank1: 0,
        water_level_tank1: 0,
        temp_water_tank2: 27,
        max_sensor_tank2: 0,
        min_sensor_tank2: 0,
        water_level_tank2: 0,
        input_valve_status: 0,
        middle_valve_status: 0,
        output_valve_status: 0,
        resistance_status: 0,
        water_is_boiled: 0,
      },
    };

    sendWebSocketData(newDataPacket);
  }, [sendWebSocketData]);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        {connected ? (
          <>
            <Typography variant="body1">Connected to WebSocket server.</Typography>
            <Button variant="contained" color="primary" onClick={handleSendData}>
              Start System
            </Button>
          </>
        ) : (
          <Typography variant="body1">Failed to connect to WebSocket server.</Typography>
        )}
      </div>
    );
  }
};

export default Home;