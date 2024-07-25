import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
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

    const OwnerMessage = (() => {
        if(isOwner){
            return(
              <Typography color='#4caf50'>
                YOU ARE CONTROLLING THE SYSTEM.
              </Typography>
            )
        } else {
            return(
              <Typography color="#f44336">
                SOMEONE ELSE IS CONTROLLING THE SYSTEM. WHEN THEY QUIT YOU'LL ASSUME CONTROL.
              </Typography>
            )
        }
    })

    return (
        <Paper elevation={3} sx={{ 
            position: 'fixed', bottom: 0, left: 0, right: 0, height: '160px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-around'
            }}>
            {controlButton()}
            {OwnerMessage()}
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