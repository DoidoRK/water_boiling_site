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
                    <Stack direction="column" alignItems="stretch"  justifyContent="center">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            spacing={20}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="caption">
                                    Detection volume: {systemParams.water_tank_water_max_level} m3
                                </Typography>
                                <LevelSensor active={readings.max_sensor_tank1}/>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="caption">
                                    Detection volume: {systemParams.water_tank_water_min_level} m3
                                </Typography>
                                <LevelSensor active={readings.min_sensor_tank1}/>
                            </Stack>
                        </Stack>
                        <Valve state={readings.input_valve_status} />
                        <Typography>Input valve</Typography>
                        <Typography variant="caption">Flow rate: {systemParams.input_valve_flow_speed} m3/s</Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography>Water Supply Tank</Typography>
                        <Typography>Volume: {systemParams.water_supply_volume} m3</Typography>
                        <Tank
                            water_volume={readings.water_level_tank1}
                            value={(readings.water_level_tank1/systemParams.water_supply_volume)*100}
                        />
                    </Stack>
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            spacing={20}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="caption">
                                    Detection volume: {systemParams.boiling_tank_water_max_level} m3
                                </Typography>
                                <LevelSensor active={readings.max_sensor_tank2}/>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="caption">
                                    Detection volume: {systemParams.boiling_tank_water_min_level} m3
                                </Typography>
                                <LevelSensor active={readings.min_sensor_tank2}/>
                            </Stack>
                        </Stack>
                        <Valve state={readings.middle_valve_status}/>
                        <Typography>Middle valve</Typography>
                        <Typography variant="caption">
                            Flow rate: {systemParams.middle_valve_flow_speed} m3/s
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography>Boiling Tank</Typography>
                        <Typography>Volume: {systemParams.boiling_tank_volume} m3</Typography>
                        <Tank 
                            water_volume={readings.water_level_tank2}
                            value={(readings.water_level_tank2/systemParams.boiling_tank_volume)*100}
                            temperature={readings.temp_water_tank2}
                        />
                    </Stack>
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={13}
                        >
                            <Stack direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <Resistance active={readings.resistance_status}/>
                                <Stack direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
                                    <Typography variant="caption">Temperature increase rate: {systemParams.water_boiling_rate}°C/s</Typography>
                                    <Typography variant="caption">Target temperature: {systemParams.target_temperature}°C</Typography>
                                    <Typography variant="caption">Current Temperature: {readings.temp_water_tank2}°C</Typography>
                                </Stack>
                            </Stack>
                            <Box/>
                        </Stack>
                    <Valve state={readings.output_valve_status} temperature={readings.temp_water_tank2}/>
                    <Typography>Output valve</Typography>
                    <Typography variant="caption">Flow rate: {systemParams.output_valve_flow_speed} m3/s</Typography>
                    </Stack>
                </Stack>
            </CenteredPaper>
        </Box>
    );
}

export default SystemVisualization;