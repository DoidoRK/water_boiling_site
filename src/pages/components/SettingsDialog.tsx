import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import useSystemSimulation from '../useSystemSimulation';
import { SystemParams } from '../../types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose }) => {
  const { saveSettings, resetSettings, systemParametersInitialState } = useSystemSimulation();
  const [newSystemSettings, setNewSystemSettings] = useState<SystemParams>(systemParametersInitialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSystemSettings({
      ...newSystemSettings,
      [name]: Number(value),
    });
  };

  const handleSave = () => {
    saveSettings(newSystemSettings);
    onClose();
  };

  const handleReset = () => {
    setNewSystemSettings(systemParametersInitialState);
    resetSettings();
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">System Configuration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Configure the system parameters below:
        </DialogContentText>
        <TextField
          label="Input Valve Flow Speed"
          name="input_valve_flow_speed"
          type="number"
          value={newSystemSettings.input_valve_flow_speed}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Middle Valve Flow Speed"
          name="middle_valve_flow_speed"
          type="number"
          value={newSystemSettings.middle_valve_flow_speed}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Output Valve Flow Speed"
          name="output_valve_flow_speed"
          type="number"
          value={newSystemSettings.output_valve_flow_speed}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Target Temperature"
          name="target_temperature"
          type="number"
          value={newSystemSettings.target_temperature}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Water Boiling Rate"
          name="water_boiling_rate"
          type="number"
          value={newSystemSettings.water_boiling_rate}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Sensor Reading Timer"
          name="sensor_reading_timer"
          type="number"
          value={newSystemSettings.sensor_reading_timer}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Water Tank Max Level"
          name="water_tank_water_max_level"
          type="number"
          value={newSystemSettings.water_tank_water_max_level}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Water Tank Min Level"
          name="water_tank_water_min_level"
          type="number"
          value={newSystemSettings.water_tank_water_min_level}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Boiling Tank Max Level"
          name="boiling_tank_water_max_level"
          type="number"
          value={newSystemSettings.boiling_tank_water_max_level}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Boiling Tank Min Level"
          name="boiling_tank_water_min_level"
          type="number"
          value={newSystemSettings.boiling_tank_water_min_level}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Reset Settings
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;