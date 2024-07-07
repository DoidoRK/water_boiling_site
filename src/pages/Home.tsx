import React, { useCallback } from 'react';
import { Typography, CircularProgress, Button, Paper, BottomNavigation } from '@mui/material';
import SystemVisualization from './components/SystemVisualization';
import useSystemSimulation from './useSystemSimulation';

const Home: React.FC = () => {
  const { loading, sensorReadings, simulationStarted, systemParams, setSystemParams, handleSendStart, handleSendStop } = useSystemSimulation();

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Typography variant="body1">Connected to WebSocket server.</Typography>
        <SystemVisualization readings={ sensorReadings } systemParams={ systemParams }/>
        <Paper elevation={2} sx={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '100px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'
          }}>
            { !simulationStarted? (
                <Button variant="contained" color="success" onClick={ handleSendStart }>
                  Start System
                </Button>
            ) : (
              <Button variant="contained" color="error" onClick={ handleSendStop }>
                Stop System
              </Button>
            )}
            <Typography variant="body1">
              Water level in water supply: {sensorReadings.water_level_tank1} / {systemParams.water_tank_water_max_level} m3
            </Typography>
            <Typography variant="body1">
              Water level in boiling tank: {sensorReadings.water_level_tank1} / {systemParams.water_tank_water_max_level} m3
            </Typography>
            <Typography variant="body1">Temperature in boiling tank: {sensorReadings.temp_water_tank2}° Celsius</Typography>
        </Paper>
      </>
    );
  }
};

export default Home;