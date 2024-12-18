import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';

const usePresaleUpdates = (address: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [holders, setHolders] = useState<any[]>([]);

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_API_WS_HOST || '';
        const s = io(socketUrl + '/transaction', {
            transports: ['websocket'],
        });

        setSocket(s);

        s.on('connect', () => {
            console.log('Socket connected');
        });


        s.on('disconnect', (reason: Socket.DisconnectReason, description?: DisconnectDescription) => {
            console.log('Socket disconnected', reason);
        });

        s.on('transactionUpdate', (data: any) => {
            if (data.address === address && data.holders) {
                console.log('transactionUpdate', data.holders);
                setHolders(data.holders);
            }
        });

        // Cleanup on unmount
        return () => {
            s.disconnect();
        };
    }, [address]);

    return {
        socket,
        holders,
    };
};

export default usePresaleUpdates;
