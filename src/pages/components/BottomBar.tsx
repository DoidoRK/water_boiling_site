import React from 'react';
import { Typography, Button, Paper, Stack } from '@mui/material';
import useSystemSimulation from '../useSystemSimulation';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from './SettingsDialog';

const BottomBar: React.FC = () => {
    const { 
        sensorReadings, 
        simulationStarted, 
        systemParams, 
        handleSendStart, 
        handleSendStop, 
        handleOpenSettings, 
        settingsOpen, 
        closeSettings 
    } = useSystemSimulation();

    return (
        <Paper elevation={3} sx={{ 
            position: 'fixed', bottom: 0, left: 0, right: 0, height: '160px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'
            }}>
            { !simulationStarted ? (
                <Button variant="contained" color="success" onClick={ handleSendStart }>
                    Start System
                </Button>
            ) : (
                <Button variant="contained" color="error" onClick={ handleSendStop }>
                    Stop System
                </Button>
            )}
            <Stack direction="column">
                <Typography variant="body1">
                    Water Supply max level sensor detection level: {systemParams.water_tank_water_max_level} m3
                </Typography>
                <Typography variant="body1">
                    Water Supply min level sensor detection level: {systemParams.water_tank_water_min_level} m3
                </Typography>
                <Typography variant="body1">
                    Water level in water supply: {sensorReadings.water_level_tank1} m3
                </Typography>
            </Stack>
            <Stack direction="column">
                <Typography variant="body1">
                    Boiling tank max level sensor detection level: {systemParams.boiling_tank_water_max_level} m3
                </Typography>
                <Typography variant="body1">
                    Boiling tank min level sensor detection level: {systemParams.boiling_tank_water_min_level} m3
                </Typography>
                <Typography variant="body1">
                    Water level in boiling tank: {sensorReadings.water_level_tank2} m3
                </Typography>
            </Stack>
            <Stack direction="column">
                <Typography variant="body1">Temperature in boiling tank: {sensorReadings.temp_water_tank2}° Celsius</Typography>
                <Typography variant="body1">Target temperature: {systemParams.target_temperature}° Celsius</Typography>
            </Stack>
            <Button variant="contained" startIcon={<SettingsIcon />} color="warning" onClick={handleOpenSettings}>
                System
            </Button>
            <SettingsDialog open={settingsOpen} onClose={closeSettings} />
        </Paper>
    );
};

export default BottomBar;