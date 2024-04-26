// src/hooks/useWebSocket.js
import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const useWebSocket = () => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const newClient = new W3CWebSocket('ws://127.0.0.1:8000');
        setClient(newClient);

        return () => {
            newClient.close();
        };
    }, []);

    return client;
};

export default useWebSocket;
