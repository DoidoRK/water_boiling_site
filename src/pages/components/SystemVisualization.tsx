import Tank from './Tank';
import Valve from './Valves';
import { Box, Paper, Stack } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { styled } from '@mui/material/styles';
import LevelSensor from './LevelSensor';
import { SensorReadings } from '../../types';
import Resistance from './Resistance';

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
  readings?: SensorReadings;
}

const SystemVisualization: React.FC<SystemVisualizationProps> = ({ readings }) => {  
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
                            <LevelSensor active={false}/>
                            <LevelSensor active={true}/>
                        </Stack>
                        <Valve state={true} />
                    </Stack>
                    <Tank value={30}/>
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            spacing={20}
                        >
                            <LevelSensor active={true}/>
                            <LevelSensor active={true}/>
                        </Stack>
                        <Valve state={false}/>
                    </Stack>
                    <Tank value={85}/>
                    <Stack direction="column">
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={13}
                        >
                            <Resistance active={true}/>
                            <Box/>
                        </Stack>
                    <Valve state={true} temperature={27}/>
                    </Stack>
                </Stack>
            </CenteredPaper>
        </Box>
    );
}

export default SystemVisualization;