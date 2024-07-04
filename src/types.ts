enum MessageOp {
    CONNECTION_ATTEMPT,
    SERVER_CONNECTION_ESTABLISHED,
    SYSTEM_PARAM_CHANGE,
    SYSTEM_STARTUP,
    SYSTEM_STATUS,
    SYSTEM_INTR,
    SYSTEM_SHUTDOWN
}

enum DeviceType {
    ESP,
    FRONT_END,
    SERVER
}

type SystemParams = {
    input_valve_flow_speed: number;
    middle_valve_flow_speed: number;
    output_valve_flow_speed: number;
    water_boiling_rate: number;
    sensor_reading_timer: number;
    water_tank_water_max_level: number;
    water_tank_water_min_level: number;
    boiling_tank_water_max_level: number;
    boiling_tank_water_min_level: number;
}

type SensorReadings = {
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

type DataPacket = {
    device_type: DeviceType;
    message_type: MessageOp;
    system_settings: SystemParams;
    sensor_readings: SensorReadings;
}

export { MessageOp, DeviceType };
export type { SystemParams, SensorReadings, DataPacket };