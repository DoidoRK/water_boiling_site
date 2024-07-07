import { useState, useEffect, useCallback } from 'react';
import useCmdWebSocket from '../services/useCmdWebSocket';
import { DataPacket, DeviceType, MessageOp, SystemParams, SensorReadings } from '../types';

const useSystemSimulation = () => {
    const systemParametersInitialState: SystemParams = {
        input_valve_flow_speed: 150,
        middle_valve_flow_speed: 150,
        output_valve_flow_speed: 150,
        target_temperature: 70,
        water_boiling_rate: 150,
        sensor_reading_timer: 100,
        water_tank_water_max_level: 95,
        water_tank_water_min_level: 20,
        boiling_tank_water_max_level: 95,
        boiling_tank_water_min_level: 20,
    }
    
    const sensorReadingsInitialState: SensorReadings = {
        max_sensor_tank1: 0,
        min_sensor_tank1: 0,
        water_level_tank1: 0,
        temp_water_tank2: 27,
        max_sensor_tank2: 0,
        min_sensor_tank2: 0,
        water_level_tank2: 0,
        input_valve_status: 0,
        middle_valve_status: 0,
        output_valve_status: 0,
        resistance_status: 0,
        water_is_boiled: 0,
    }

    const [ simulationStarted, setSimulationStarted ] = useState(false);
    const [ settingsOpen, setSettingsOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ systemParams, setSystemParams ] = useState<SystemParams>(systemParametersInitialState);
    const [ sensorReadings, setSensorReadings ] = useState<SensorReadings>(sensorReadingsInitialState);
    const { cmdSocketconnected, sendCmdWebSocketData } = useCmdWebSocket();
    
    useEffect(() => {
        if(cmdSocketconnected){
            setLoading(false);
        }
    }, [cmdSocketconnected]);

    const handleOpenSettings = useCallback(() => {
        setSettingsOpen(true);
    }, [setSettingsOpen]);

    const saveSettings = useCallback((newSettings: SystemParams) => {
        setSystemParams(newSettings);
        setSettingsOpen(false);
    }, [setSystemParams]);

    const closeSettings = useCallback(() => {
        setSettingsOpen(false);
    }, [setSettingsOpen]);

    const resetSettings = useCallback(() => {
        setSystemParams(systemParametersInitialState);
    }, [setSystemParams]);

    const handleSendStart = useCallback(() => {
        const newDataPacket: DataPacket = {
        device_type: DeviceType.FRONT_END,
        message_type: MessageOp.SYSTEM_STARTUP,
        system_settings: systemParams,
        sensor_readings: sensorReadings,
        };
        sendCmdWebSocketData(newDataPacket);
        setSimulationStarted(true);
    }, [sendCmdWebSocketData]);

    const handleSendStop = useCallback(() => {
        const newDataPacket: DataPacket = {
        device_type: DeviceType.FRONT_END,
        message_type: MessageOp.SYSTEM_SHUTDOWN,
        system_settings: systemParams,
        sensor_readings: sensorReadings,
        };
        sendCmdWebSocketData(newDataPacket);
        setSimulationStarted(false);
    }, [sendCmdWebSocketData]);

    return { 
        systemParametersInitialState,
        simulationStarted, loading,
        settingsOpen, handleOpenSettings,
        saveSettings, closeSettings, resetSettings,
        sensorReadings, setSensorReadings,
        systemParams, setSystemParams,
        handleSendStart, handleSendStop
    };
};

export default useSystemSimulation;