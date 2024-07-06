import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  transform: 'rotate(270deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 300,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[600],
  },
}));

interface TankProps {
  value: number;
  temperature?: number;
}

const Tank: React.FC<TankProps> = ({ value = 0, temperature = 27 }) => {  
  if(temperature > 60){
    return (
      <BorderLinearProgress variant="determinate" value={value} color='error' />
    );
  } else if(temperature >= 40 && temperature <= 60){
    return (
      <BorderLinearProgress variant="determinate" value={value} color='warning'/>
    );
  } else {
    return (
      <BorderLinearProgress variant="determinate" value={value} />
    );
  }
}

export default Tank;