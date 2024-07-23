import React from 'react';
import { Typography, Button, Paper, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { SensorReadings, SystemParams } from '../../types';

interface BottomBarProps {
    isOwner: boolean,
    simulationStarted: boolean;
    sensorReadings: SensorReadings;
    systemParams: SystemParams;
    handleSendStart: () => void;
    handleSendStop: () => void;
    handleOpenSettings: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
        isOwner,
        simulationStarted,
        sensorReadings,
        systemParams,
        handleSendStart,
        handleSendStop,
        handleOpenSettings,
    }) => {

    const controlButton = (() => {
        if(!simulationStarted){
            return(
                <Button
                    variant="contained" color="success" onClick={ handleSendStart }
                    disabled={sensorReadings.draining_system === 1 || !isOwner}>
                    Start System
                </Button>
            )
        } else {
            return(
                <Button variant="contained" color="error" onClick={ handleSendStop } disabled={ !isOwner }>
                    Stop System
                </Button>
            )
        }
    })

    return (
        <Paper elevation={3} sx={{ 
            position: 'fixed', bottom: 0, left: 0, right: 0, height: '160px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'
            }}>
            {controlButton()}
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
                <Typography variant="body1">
                    Input valve flow speed: {systemParams.input_valve_flow_speed} m3
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
                <Typography variant="body1">
                    Middle valve flow speed: {systemParams.middle_valve_flow_speed} m3
                </Typography>
            </Stack>
            <Stack direction="column">
                <Typography variant="body1">Temperature in boiling tank: {sensorReadings.temp_water_tank2}° Celsius</Typography>
                <Typography variant="body1">Target temperature: {systemParams.target_temperature}° Celsius</Typography>
                <Typography variant="body1">
                    Output valve flow speed: {systemParams.output_valve_flow_speed} m3
                </Typography>
                <Typography variant="body1">
                    Water temperature increase rate: {systemParams.water_boiling_rate} m3
                </Typography>
            </Stack>
            <Button variant="contained" startIcon={<SettingsIcon />} color="warning"
                onClick={handleOpenSettings}
                disabled={simulationStarted || (sensorReadings.draining_system === 1 || !isOwner)}
            >
                    Settings
            </Button>
        </Paper>
    );
};

export default BottomBar;