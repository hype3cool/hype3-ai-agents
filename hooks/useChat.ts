import { Message, User } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import io, { Manager, Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';

const useChat = (roomName: string, canChat: boolean, onOpen?: () => void, onClose?: () => void, onMessageReceived?: (message: Message) => void, onRecentMessagesReceived?: () => void, onListenerDisconnect?: (username: string, isMine: boolean) => void) => {
    const { data: session, status } = useSession();

    const [messages, setMessages] = useState<Message[]>([]);
    const [activeConnections, setActiveConnections] = useState<User[]>([]);
    const [activeListeners, setActiveListeners] = useState<User[]>([]);
    const [allRoomsCount, setAllRoomsCount] = useState<Record<string, number>>({});
    const [socket, setSocket] = useState<Socket | null>(null);
    const alreadyLoadingPreviousMessage = useRef<boolean>(false);

    useEffect(() => {
        if (socket) {
            socket.disconnect();
        }

        if (status == 'authenticated' && canChat) {
            const socketUrl = process.env.NEXT_PUBLIC_API_WS_HOST || '';
            const s = io(socketUrl, {
                transports: ['websocket'], // Specify websocket transport
                query: { roomName: roomName },
                auth: { token: session.backendTokens.accessToken }
            }); // Adjust the URL to your NestJS server

            setSocket(s);

            s.on('connect', () => {
                console.log('Socket connected');
                setMessages([]);
                setActiveConnections([]);
                setActiveListeners([]);
                if (onOpen) onOpen();
            });

            s.on('connect_error', (error: any) => {
                console.log(error);
                if (onClose) onClose();
            });

            s.on('disconnect', (reason: Socket.DisconnectReason, description?: DisconnectDescription) => {
                // setMessages([]);
                // setActiveConnections([]);
                setActiveListeners([]);
                console.log('Socket disconnected', reason);
                if (onClose) onClose();
            });

            s.on('allRoomsMemberCount', (roomsCount: Record<string, number>) => {
                setAllRoomsCount(roomsCount);
            });

            s.on('userCountUpdate', (connections: User[]) => {
                setActiveConnections(connections);
            });

            s.on('userListenerUpdate', (connections: User[]) => {
                setActiveListeners(connections);
            });

            s.on('recentMessages', (messages: Message[]) => {
                setMessages((prevMessages) => [...messages, ...prevMessages]);
                if (onRecentMessagesReceived) onRecentMessagesReceived();
                alreadyLoadingPreviousMessage.current = false;
            });

            s.on('message', (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
                if (onMessageReceived) onMessageReceived(message);
            });

            s.on('disconnect_listener', (username: string, clientId: string) => {
                if (onListenerDisconnect) onListenerDisconnect(username, clientId == s.id);
            });

            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    if (socket && socket.disconnected) {
                        socket.connect();
                    }
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                s.disconnect();
            };
        }
    }, [roomName, status, canChat]);

    const sendMessage = (message: string) => {
        if (socket) {
            socket.emit('chat_room_message_send', message);
        }
    };

    const joinListenerChannel = () => {
        if (socket) {
            socket.emit('join_listening_channel');
        }
    };

    const leaveListenerChannel = () => {
        if (socket) {
            socket.emit('leave_listening_channel');
        }
    };

    const loadPreviousMessage = (messageId: string) => {
        if (socket && alreadyLoadingPreviousMessage.current == false) {
            socket.emit('load_previous_message', messageId);
            alreadyLoadingPreviousMessage.current = true;
        }
    };

    return { messages, activeConnections, activeListeners, allRoomsCount, alreadyLoadingPreviousMessage, sendMessage, loadPreviousMessage, joinListenerChannel, leaveListenerChannel };
};

export default useChat;
