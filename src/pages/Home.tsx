import React from 'react';
import { Paper, Typography } from '@mui/material';
import SystemVisualization from './components/SystemVisualization';
import useSystemSimulation from './useSystemSimulation';
import BottomBar from './components/BottomBar';
import SettingsDialog from './components/SettingsDialog';
import LoadingComponent from './components/LoadingComponent';

const Home: React.FC = () => {
  const {
    isOwner,
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
    return <LoadingComponent/>;
  } else {
    return (
      <Paper>
        <SystemVisualization
          readings={ sensorReadings }
          systemParams={ systemParams }
        />
        <BottomBar
          isOwner={isOwner}
          simulationStarted={simulationStarted}
          sensorReadings={sensorReadings}
          systemParams={systemParams}
          handleSendStart={handleSendStart}
          handleSendStop={handleSendStop}
          handleOpenSettings={handleOpenSettings}
        />
        <SettingsDialog
          systemParametersInitialState={systemParametersInitialState}
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