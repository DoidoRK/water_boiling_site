import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height: 50,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[600],
  },
}));

interface ValveProps {
    state: number;
    temperature?: number;
}


const Valve: React.FC<ValveProps> = ({ state, temperature = 27 }) => {  
    if(state === 1){
        if(temperature > 60){
            return (
              <BorderLinearProgress variant="indeterminate" color='error' />
            );
          } else if(temperature >= 40 && temperature <= 60){
            return (
              <BorderLinearProgress variant="indeterminate" color='warning'/>
            );
          } else {
            return (
              <BorderLinearProgress variant="indeterminate" />
            );
          }
    } else {
        return (
          <BorderLinearProgress variant="determinate" value={0} />
        );
    }
}

export default Valve;
