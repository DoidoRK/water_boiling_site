import { useState, useEffect, useCallback, useRef } from 'react';
import { CommandDataPacket, MessageOp, SystemParams, SensorReadings } from '../types';
import { webSocketCmdAddress, webSocketStatusAddress } from '../config';
import { jsonToSensorReadings, jsonToSystemParams } from '../utils';

const useSystemSimulation = () => {
    const systemParametersInitialState: SystemParams = {
        water_supply_volume:100,
        boiling_tank_volume:100,
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
        draining_system: 0,
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

    const [simulationStarted, setSimulationStarted] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [systemParams, setSystemParams] = useState<SystemParams>(systemParametersInitialState);
    const [sensorReadings, setSensorReadings] = useState<SensorReadings>(sensorReadingsInitialState);

    const [cmdSocketconnected, setCmdSocketConnected] = useState(false);
    const cmdSocketRef = useRef<WebSocket | null>(null);
    const [statusSocketConnected, setStatusSocketConnected] = useState(false);
    const statusSocketRef = useRef<WebSocket | null>(null);

    const handleOpenSettings = useCallback(() => {
        setSettingsOpen(true);
    }, []);

    const saveSettings = useCallback((newSettings: SystemParams) => {
        const saveSettingsDataPacket : CommandDataPacket = {
            message_type: MessageOp.SYSTEM_PARAM_CHANGE,
            system_settings:newSettings
        }
        sendCmdWebSocketData(saveSettingsDataPacket);
        setSystemParams(newSettings);
        setSettingsOpen(false);
    }, []);

    const closeSettings = useCallback(() => {
        setSettingsOpen(false);
    }, []);

    const resetSettings = useCallback(() => {
        setSystemParams(systemParametersInitialState);
    }, []);

    useEffect(() => {
        if(cmdSocketRef.current === null){
            const commandSocket = new WebSocket(webSocketCmdAddress);
            cmdSocketRef.current = commandSocket;
    
            commandSocket.onopen = () => {
                console.log('Command WebSocket Connected server');
                setCmdSocketConnected(true);
            };
    
            commandSocket.onclose = () => {
                console.log('Command WebSocket Disconnected server');
                setCmdSocketConnected(false);
            };
    
            commandSocket.onmessage = (message) => {
                const messageData = JSON.parse(message.data)
                if(messageData.systemParams !== undefined){
                    setSystemParams(jsonToSystemParams(messageData.systemParams));
                }
                if(messageData.hasOwner !== undefined){
                    if(messageData.hasOwner){
                        setIsOwner(false);
                    } else {
                        setIsOwner(true);
                    }
                    setSimulationStarted(messageData.isRunning)
                }
            };
        }
    }, [cmdSocketconnected,isOwner]);

    const sendCmdWebSocketData = useCallback((CommandDataPacket : CommandDataPacket) => {
        if (cmdSocketRef.current && cmdSocketRef.current.readyState === WebSocket.OPEN) {
            cmdSocketRef.current.send(JSON.stringify(CommandDataPacket));
        } else {
            console.error('Command WebSocket is not open');
        }
    }, []);

    const handleSendStart = useCallback(() => {
        const handleStartData : CommandDataPacket = {
            message_type: MessageOp.SYSTEM_STARTUP,
            system_settings:systemParams,
        }
        sendCmdWebSocketData(handleStartData);
        setSimulationStarted(true);
    }, [sendCmdWebSocketData]);

    const handleSendStop = useCallback(() => {
        const handleShutdownData : CommandDataPacket = {
            message_type: MessageOp.SYSTEM_SHUTDOWN,
            system_settings:systemParams,
        }
        sendCmdWebSocketData(handleShutdownData);
        setSimulationStarted(false);
    }, [sendCmdWebSocketData]);

    useEffect(() => {
        if (!cmdSocketconnected && !statusSocketConnected) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [cmdSocketconnected]);

    useEffect(() => {
        if(statusSocketRef.current === null){
            const statusSocket = new WebSocket(webSocketStatusAddress);
            statusSocketRef.current = statusSocket;
    
            statusSocket.onopen = () => {
                console.log('WebSocket Status Connected');
                setStatusSocketConnected(true);
            };
    
            statusSocket.onclose = () => {
                console.log('Status WebSocket disconnected');
                setStatusSocketConnected(false);
            };
    
            statusSocket.onmessage = (message) => {
                setSensorReadings(jsonToSensorReadings(JSON.parse(message.data)));
            };
        }
    }, []);

    return { 
        isOwner,
        systemParametersInitialState,
        simulationStarted, 
        loading,
        settingsOpen, 
        handleOpenSettings,
        saveSettings, 
        closeSettings, 
        resetSettings,
        sensorReadings, 
        setSensorReadings,
        systemParams, 
        setSystemParams,
        handleSendStart, 
        handleSendStop
    };
};

export default useSystemSimulation;