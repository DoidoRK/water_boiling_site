import React from 'react';
import { CircularProgress, Paper } from '@mui/material';
import SystemVisualization from './components/SystemVisualization';
import useSystemSimulation from './useSystemSimulation';
import BottomBar from './components/BottomBar';

const Home: React.FC = () => {
  const { loading, sensorReadings,systemParams } = useSystemSimulation();

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Paper>
        <SystemVisualization readings={ sensorReadings } systemParams={ systemParams }/>
        <BottomBar/>
      </Paper>
    );
  }
};

export default Home;