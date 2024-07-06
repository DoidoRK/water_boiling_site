import { Sensors, SensorsOff } from '@mui/icons-material';

interface LevelSensorProps {
    active: boolean;
}

const LevelSensor: React.FC<LevelSensorProps> = ({ active }) => {  
    if(active){
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