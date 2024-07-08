import Tank from './Tank';
import Valve from './Valves';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LevelSensor from './LevelSensor';
import { SensorReadings, SystemParams } from '../../types';
import Resistance from './Resistance';
import { useEffect, useState } from 'react';

const CenteredPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh', // Adjust this height as needed
}));

interface SystemVisualizationProps {
  readings: SensorReadings;
  systemParams: SystemParams;
}

const SystemVisualization: React.FC<SystemVisualizationProps> = ({ 
    readings,
    systemParams,
}) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <CenteredPaper elevation={3}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            spacing={20}
                        >
                            <LevelSensor active={readings.max_sensor_tank1}/>
                            <LevelSensor active={readings.min_sensor_tank1}/>
                        </Stack>
                        <Valve state={readings.input_valve_status} />
                        <Typography>Input valve</Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography>Water Supply Tank</Typography>
                        <Tank value={(readings.water_level_tank1/systemParams.water_tank_water_max_level)*100}/>
                    </Stack>
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            spacing={20}
                        >
                            <LevelSensor active={readings.max_sensor_tank2}/>
                            <LevelSensor active={readings.min_sensor_tank2}/>
                        </Stack>
                        <Valve state={readings.middle_valve_status}/>
                        <Typography>Middle valve</Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography>Boiling Tank</Typography>
                        <Tank 
                            value={(readings.water_level_tank2/systemParams.boiling_tank_water_max_level)*100}
                            temperature={readings.temp_water_tank2}
                        />
                    </Stack>
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={13}
                        >
                            <Resistance active={readings.resistance_status}/>
                            <Box/>
                        </Stack>
                    <Valve state={readings.output_valve_status} temperature={readings.temp_water_tank2}/>
                    <Typography>Output valve</Typography>
                    </Stack>
                </Stack>
            </CenteredPaper>
        </Box>
    );
}

export default SystemVisualization;