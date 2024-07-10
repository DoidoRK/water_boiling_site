import { SystemParams, SensorReadings } from './types';

const jsonToSystemParams = (json: any): SystemParams => {
    return {
        input_valve_flow_speed: json.input_valve_flow_speed,
        middle_valve_flow_speed: json.middle_valve_flow_speed,
        output_valve_flow_speed: json.output_valve_flow_speed,
        target_temperature: json.target_temperature,
        water_boiling_rate: json.water_boiling_rate,
        sensor_reading_timer: json.sensor_reading_timer,
        water_tank_water_max_level: json.water_tank_water_max_level,
        water_tank_water_min_level: json.water_tank_water_min_level,
        boiling_tank_water_max_level: json.boiling_tank_water_max_level,
        boiling_tank_water_min_level: json.boiling_tank_water_min_level
    };
};

const jsonToSensorReadings = (json: any): SensorReadings => {
    return {
      draining_system: json.draining_system,
      max_sensor_tank1: json.max_sensor_tank1,
      min_sensor_tank1: json.min_sensor_tank1,
      water_level_tank1: json.water_level_tank1,
      temp_water_tank2: json.temp_water_tank2,
      max_sensor_tank2: json.max_sensor_tank2,
      min_sensor_tank2: json.min_sensor_tank2,
      water_level_tank2: json.water_level_tank2,
      input_valve_status: json.input_valve_status,
      middle_valve_status: json.middle_valve_status,
      output_valve_status: json.output_valve_status,
      resistance_status: json.resistance_status,
      water_is_boiled: json.water_is_boiled
    };
  };

export { jsonToSystemParams, jsonToSensorReadings };