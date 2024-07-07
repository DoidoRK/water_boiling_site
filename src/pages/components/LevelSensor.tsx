import { Sensors, SensorsOff } from '@mui/icons-material';

interface LevelSensorProps {
    active: number;
}

const LevelSensor: React.FC<LevelSensorProps> = ({ active }) => {  
    if(active === 1){
        return (
            <Sensors color='success'/>
        );
    } else {
        return (
            <SensorsOff color='error'/>
        );
    }
}
export default LevelSensor;