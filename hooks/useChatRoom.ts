import { Listener, Message, User } from '@/types/types';
import { createContext, useContext } from 'react';

export interface ChatRoomContextState {
    isSocketConnected: boolean;
    canChat: boolean;
    setCanChat: (value: boolean) => void;
    isBalanceLoading: boolean;
    isRoomJoined: boolean;
    toggleCall: () => void;
    isMuted: boolean;
    toggleMute: () => void;
    isStreaming: boolean
    isScreenSharing: boolean;

    messages: Message[]; // Replace 'any' with your message type
    activeConnections: User[];
    allRoomsCount: Record<string, number>;
    user: any; // Replace 'any' with your user type
    textArea: string;
    showPicker: boolean;
    shouldScroll: boolean;
    activeListeners: Listener[];

    startShare: () => void;
    stopShare: () => void;
    shareCameraMode: () => void;
    shareScreenMode: () => void;
    setIsMuted: (value: boolean) => void;
    setTextArea: (value: string) => void;
    setShowPicker: (value: boolean) => void;
    setShouldScroll: (value: boolean) => void;
    sendMessage: (message: string) => void;
    loadPreviousMessage: (messageId: string) => void;
    joinListenerChannel: () => void;
    leaveListenerChannel: () => void;
}

// const ChatRoomContext = createContext<ChatRoomContextType | undefined>(undefined);
export const ChatRoomContext = createContext<ChatRoomContextState>({} as ChatRoomContextState);

export const useChatRoom = () => {
    const context = useContext(ChatRoomContext);
    if (context === undefined) {
        throw new Error('useChatRoom must be used within a ChatRoomProvider');
    }
    return context;
};
