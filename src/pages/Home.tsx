import React from 'react';
import { CircularProgress, Paper } from '@mui/material';
import SystemVisualization from './components/SystemVisualization';
import useSystemSimulation from './useSystemSimulation';
import BottomBar from './components/BottomBar';
import SettingsDialog from './components/SettingsDialog';

const Home: React.FC = () => {
  const {
    systemParametersInitialState,
    simulationStarted, 
    loading,
    settingsOpen, 
    handleOpenSettings,
    saveSettings, 
    closeSettings, 
    resetSettings,
    sensorReadings, 
    systemParams, 
    setSystemParams,
    handleSendStart, 
    handleSendStop
  } = useSystemSimulation();

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Paper>
        <SystemVisualization readings={ sensorReadings } systemParams={ systemParams }/>
        <BottomBar
          simulationStarted={simulationStarted}
          sensorReadings={sensorReadings}
          systemParams={systemParams}
          handleSendStart={handleSendStart}
          handleSendStop={handleSendStop}
          handleOpenSettings={handleOpenSettings}
        />
        <SettingsDialog
          systemSettings={systemParams}
          settingsOpen={settingsOpen}
          closeSettings={closeSettings}
          saveSettings={saveSettings}
          resetSettings={resetSettings}
          setSystemParams={setSystemParams}
        />
      </Paper>
    );
  }
};

export default Home;