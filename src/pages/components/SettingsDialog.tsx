// SettingsDialog component
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { Stack } from '@mui/material';
import { SystemParams } from '../../types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface SettingsDialogProps {
  systemSettings: SystemParams;
  settingsOpen: boolean;
  closeSettings: () => void;
  saveSettings: (newSettings: SystemParams) => void;
  resetSettings: () => void;
  setSystemParams: (params: SystemParams) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  systemSettings,
  settingsOpen,
  closeSettings,
  saveSettings,
  resetSettings,
  setSystemParams,
}) => {    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSystemParams({
      ...systemSettings,
      [name]: parseInt(value),
    });
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={settingsOpen}
      onClose={closeSettings}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">System Settings</DialogTitle>
      <DialogContent>
        <Stack direction='row'>
          <TextField
            label="Input Valve Flow Speed"
            name="input_valve_flow_speed"
            type="string"
            value={systemSettings.input_valve_flow_speed}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Stack direction="column">
            <TextField
              label="Water Supply Max Level"
              name="water_tank_water_max_level"
              type="string"
              value={systemSettings.water_tank_water_max_level}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Water Supply Min Level"
              name="water_tank_water_min_level"
              type="string"
              value={systemSettings.water_tank_water_min_level}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Stack>
          <TextField
            label="Middle Valve Flow Speed"
            name="middle_valve_flow_speed"
            type="string"
            value={systemSettings.middle_valve_flow_speed}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Stack direction="column">
            <TextField
              label="Boiling Tank Max Level"
              name="boiling_tank_water_max_level"
              type="string"
              value={systemSettings.boiling_tank_water_max_level}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Boiling Tank Min Level"
              name="boiling_tank_water_min_level"
              type="string"
              value={systemSettings.boiling_tank_water_min_level}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Target Temperature"
              name="target_temperature"
              type="string"
              value={systemSettings.target_temperature}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Water Boiling Rate"
              name="water_boiling_rate"
              type="string"
              value={systemSettings.water_boiling_rate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Stack>
          <TextField
            label="Output Valve Flow Speed"
            name="output_valve_flow_speed"
            type="string"
            value={systemSettings.output_valve_flow_speed}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetSettings} color="primary">
          Reset Settings
        </Button>
        <Button onClick={() => saveSettings(systemSettings)} color="primary">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default SettingsDialog;