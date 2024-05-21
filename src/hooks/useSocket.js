import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io({
            path: '/api/socket',
        });
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected to server');
        });

        socketInstance.on('message', (msg) => {
            new Notification('New Message', { body: `${msg.username}: ${msg.message}` });
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    return socket;
};

export default useSocket;
