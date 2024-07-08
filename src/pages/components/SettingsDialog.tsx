// SettingsDialog component
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { Stack, Typography } from '@mui/material';
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
  systemSettingsDefaultState: SystemParams;
  settingsOpen: boolean;
  closeSettings: () => void;
  saveSettings: (newSettings: SystemParams) => void;
  resetSettings: () => void;
  setSystemParams: (params: SystemParams) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  systemSettingsDefaultState,
  settingsOpen,
  closeSettings,
  saveSettings,
  resetSettings,
  }) => {
  const [newSystemSettings, setNewSystemSettings] = useState<SystemParams>(systemSettingsDefaultState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSystemSettings({
      ...newSystemSettings,
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
        <Stack direction = "column">
          <Stack direction='row' alignItems='center' spacing={2} display="flex">
            <Stack direction="column">
              <Typography>
                Water Supply Settings
              </Typography>
              <TextField
                label="Water Supply Max Level"
                name="water_tank_water_max_level"
                type="string"
                value={newSystemSettings.water_tank_water_max_level}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Water Supply Min Level"
                name="water_tank_water_min_level"
                type="string"
                value={newSystemSettings.water_tank_water_min_level}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Stack>
            
            <Stack direction="column">
              <Typography>
                Boiling Tank Settings
              </Typography>
              <TextField
                label="Boiling Tank Max Level"
                name="boiling_tank_water_max_level"
                type="string"
                value={newSystemSettings.boiling_tank_water_max_level}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Boiling Tank Min Level"
                name="boiling_tank_water_min_level"
                type="string"
                value={newSystemSettings.boiling_tank_water_min_level}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Stack>
            <Stack direction="column">
              <Typography>
                Temperature Settings
              </Typography>
              <TextField
                label="Target Temperature"
                name="target_temperature"
                type="string"
                value={newSystemSettings.target_temperature}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Water Boiling Rate"
                name="water_boiling_rate"
                type="string"
                value={newSystemSettings.water_boiling_rate}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Stack>
          </Stack>
          <Stack direction='column' spacing={1}>
            <Typography>
              Valves Setting
            </Typography>
            <Stack direction="row" spacing={2}>
            <TextField
              label="Input Valve Flow Speed"
              name="input_valve_flow_speed"
              type="string"
              value={newSystemSettings.input_valve_flow_speed}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Middle Valve Flow Speed"
              name="middle_valve_flow_speed"
              type="string"
              value={newSystemSettings.middle_valve_flow_speed}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Output Valve Flow Speed"
              name="output_valve_flow_speed"
              type="string"
              value={newSystemSettings.output_valve_flow_speed}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Stack>
          </Stack>          
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetSettings} color="warning">
          Reset Settings
        </Button>
        <Button onClick={() => saveSettings(newSystemSettings)} color="success">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default SettingsDialog;