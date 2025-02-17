enum MessageOp {
    SYSTEM_STARTUP,
    SYSTEM_PARAM_CHANGE,
    SYSTEM_SHUTDOWN
}

type SystemParams = {
    water_supply_volume: number;
    boiling_tank_volume: number;
    input_valve_flow_speed: number;
    middle_valve_flow_speed: number;
    output_valve_flow_speed: number;
    target_temperature: number;
    water_boiling_rate: number;
    sensor_reading_timer: number;
    water_tank_water_max_level: number;
    water_tank_water_min_level: number;
    boiling_tank_water_max_level: number;
    boiling_tank_water_min_level: number;
}

type SensorReadings = {
    draining_system: number;
    max_sensor_tank1: number;
    min_sensor_tank1: number;
    water_level_tank1: number;
    temp_water_tank2: number;
    max_sensor_tank2: number;
    min_sensor_tank2: number;
    water_level_tank2: number;
    input_valve_status: number;
    middle_valve_status: number;
    output_valve_status: number;
    resistance_status: number;
    water_is_boiled: number;
}

type CommandDataPacket = {
    message_type: MessageOp;
    system_settings: SystemParams;
}

export { MessageOp };
export type { SystemParams, SensorReadings, CommandDataPacket };