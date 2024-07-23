import React from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  transform: 'rotate(270deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 300,
  borderRadius: 5,
  position: 'relative',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[600],
  },
}));

interface TankProps {
  water_volume: number;
  value: number;
  temperature?: number;
}

const Tank: React.FC<TankProps> = ({ water_volume, value, temperature = 27 }) => {
  const getColor = () => {
    if (temperature > 60) return 'error';
    if (temperature >= 40 && temperature <= 60) return 'warning';
    return 'primary';
  };

  return (
    <Box position="relative" display="inline-flex">
      <BorderLinearProgress variant="determinate" value={value} color={getColor()} />
      <Box
        top="50%"
        left="50%"
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        <Typography variant="h4" component="div" color="textPrimary">
          {`${Math.round(water_volume)} m3`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Tank;