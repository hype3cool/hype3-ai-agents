'use client';
import React, { FC, ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';

// agora
import AgoraRTC, {
    AgoraRTCScreenShareProvider,
    ILocalVideoTrack,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    useLocalScreenTrack,
    usePublish,
    useRTCClient,
    useRemoteAudioTracks,
    useRemoteUsers,
    useRemoteVideoTracks,
} from 'agora-rtc-react';

// hooks
import useChat from '@/hooks/useChat';
import { ChatRoomContext } from '@/hooks/useChatRoom';
import { useTokenBalance } from '@/hooks/useTokenBalance';

import { Listener, Message } from '@/types/types';
// import { MINIMUM_CHAT_BALANCE } from '@/constants/constants';

// redux & services
import { useSelector } from '@/store';
import { UserService } from '@/services/user.service';
import { CoinService } from '@/services/coin.service';

import { useCoinData } from '../coin/CoinDataProvider';
import { get } from 'lodash';

interface ChatRoomProviderProps {
    children: React.ReactNode;
    roomId: string;
    amountToChat?: number;
    checkBalance?: boolean;
    allowAnyHolderToChat?: boolean;
    isSolana?: boolean; // if solana, authenticated user can chat without checking balance
}

export const ChatRoomProvider: React.FC<ChatRoomProviderProps> = ({ children, roomId, amountToChat = 1, checkBalance = true, allowAnyHolderToChat = false, isSolana = false }) => {
    const { data: session, status } = useSession();
    const { user } = useSelector((state: any) => state.user);
    const { authUser } = useSelector((state: any) => state.auth);
    const { isPresalePaid, checkPresalePaid, fundWalletPercentage } = useCoinData();

    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [canChat, setCanChat] = useState(false);

    const [textArea, setTextArea] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [shouldScroll, setShouldScroll] = useState(false);

    //Agora RTC variables
    const client = useRTCClient();
    const [shouldConnect, setShouldConnect] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [prevRoomJoinState, setPrevRoomJoinState] = useState(false);
    const [activeAudioListeners, setActiveAudioListeners] = useState<Listener[]>([]);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(!isMuted, { encoderConfig: 'speech_standard', ANS: false });

    const [isStreaming, setIsStreaming] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
    const [localScreenShareTrack, setLocalScreenShareTrack] = useState<ILocalVideoTrack | null>(null);

    // const { localCameraTrack } = useLocalCameraTrack(isStreaming && !isScreenSharing, { facingMode: 'user', encoderConfig: '720p_1' });
    // const { screenTrack, error: screenShareError } = useLocalScreenTrack(isStreaming && isScreenSharing, { encoderConfig: '720p_1' }, 'disable');

    // get token for RTC
    const getToken = useCallback(async (roomName: string) => {
        const appid = process.env.NEXT_PUBLIC_AGORA_APP_ID || '';
        const channel = roomName;
        const data = await new UserService().getRTCToken(channel);
        return { appid, channel, token: data.data.rtcToken, uid: data.data.username };
    }, []);

    // join the room
    const { isConnected: isRoomJoined } = useJoin(async () => {
        const getData = await getToken(roomId);
        return getData;
    }, shouldConnect && isSocketConnected);

    const [coinData, setCoinData] = useState<any>(null);
    useEffect(() => {
        getCoinData(roomId);
    }, [roomId]);

    const getCoinData = async (mint: string) => {
        try {
            const res = await new CoinService().getCoinByMintAddress(mint);
            if (res.data) setCoinData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // publish the local microphone track
    usePublish([localMicrophoneTrack]);

    // check if the room join state has changed
    useEffect(() => {
        if (isRoomJoined != prevRoomJoinState) {
            if (isRoomJoined) {
                joinListenerChannel();
            } else {
                leaveListenerChannel();
                setShouldConnect(false);
            }
            setPrevRoomJoinState(isRoomJoined);
        }
    }, [isRoomJoined]);

    // get remote users and their audio tracks
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    const { videoTracks } = useRemoteVideoTracks(remoteUsers);

    useEffect(() => {
        audioTracks.forEach((track) => track.play());
    }, [audioTracks]);

    const [messageSound, setMessageSound] = useState<HTMLAudioElement | null>(null);
    useEffect(() => {
        setMessageSound(new Audio('/assets/fx/hype3-new-message.mp3'));
    }, []);

    const playMessageSound = () => {
        if (messageSound) {
            messageSound.play();
        }
    };

    const { messages, activeConnections, activeListeners, allRoomsCount, alreadyLoadingPreviousMessage, sendMessage, loadPreviousMessage, joinListenerChannel, leaveListenerChannel } = useChat(
        roomId,
        canChat,
        () => setIsSocketConnected(true),
        () => setIsSocketConnected(false),
        (message: Message) => {
            if (message.sender._id != session?.user.id) {
                playMessageSound();
            }
            setShouldScroll(true);
        },
        () => {
            if (!alreadyLoadingPreviousMessage.current) {
                setShouldScroll(true);
            }
        },
        (username: string, isMine: boolean) => {
            if ((user == null || user.username == username) && !isMine) {
                setShouldConnect(false);
            }
        },
    );
    const { balance, isLoading: isBalanceLoading } = useTokenBalance(roomId);

    useEffect(() => {
        if (!coinData) return;

        const isPresaleEnded = !!coinData?.presaleEndAt && new Date(coinData?.presaleEndAt) < new Date();

        if (coinData?.isCreated) {
            if (status === 'authenticated') {
                if (authUser?.isAdmin || isSolana) {
                    setCanChat(true);
                } else {
                    // check if the user has enough balance to chat
                    if (!isBalanceLoading && balance != null) {
                        setCanChat(balance > amountToChat);
                    } else {
                        setCanChat(false);
                    }
                    // setCanChat(true);
                }
            } else {
                setCanChat(false);
            }
        } else {
            if (isPresaleEnded) {
                if (fundWalletPercentage < 100) {
                    setCanChat(true);
                }
            } else {
                if (isPresalePaid) {
                    setCanChat(true);
                }
            }
        }
    }, [status, checkBalance, allowAnyHolderToChat, isBalanceLoading, balance, coinData, fundWalletPercentage, isPresalePaid]);

    useEffect(() => {
        if (status === 'authenticated') {
            setShouldScroll(true);
        } else {
            setShouldConnect(false);
        }
    }, [status]);

    const startShare = () => {
        if (!isStreaming) {
            setIsStreaming(true);

            if (!isRoomJoined) {
                toggleCall();
            }
        }
    };

    const stopShare = () => {
        if (isStreaming) {
            setIsStreaming(false);
        }
    };

    useEffect(() => {
        if (!shouldConnect) {
            setIsScreenSharing(false);
            setIsStreaming(false);
        } else if (isRoomJoined) {
            if (isStreaming) {
                if (isScreenSharing) {
                    if (localVideoTrack) {
                        client.unpublish(localVideoTrack).then(() => {
                            localVideoTrack.close();
                            setLocalVideoTrack(null);
                        });
                    }

                    AgoraRTC.createScreenVideoTrack({ encoderConfig: '720p_1' }, 'disable')
                        .then((v) => {
                            v.on('track-ended', () => {
                                setIsScreenSharing(false);
                            });
                            client.publish(v).then(() => {
                                setLocalScreenShareTrack(v);
                                console.log('Setting to screen track', v);
                            });
                        })
                        .catch((e) => {
                            console.error(e);
                            setIsScreenSharing(false);
                        });
                } else {
                    if (localScreenShareTrack) {
                        client.unpublish(localScreenShareTrack).then(() => {
                            localScreenShareTrack.close();
                            setLocalScreenShareTrack(null);
                        });
                    }

                    AgoraRTC.createCameraVideoTrack({ encoderConfig: '720p_1' })
                        .then((v) => {
                            client.publish(v).then(() => {
                                setLocalVideoTrack(v);
                                console.log('Setting to camera track', v);
                            });
                        })
                        .catch((e) => {
                            setIsStreaming(false);
                        });
                }
            } else {
                if (localVideoTrack) {
                    client.unpublish(localVideoTrack);
                    localVideoTrack.close();
                }
                if (localScreenShareTrack) {
                    client.unpublish(localScreenShareTrack);
                    localScreenShareTrack.close();
                }
                setLocalVideoTrack(null);
                setLocalScreenShareTrack(null);
            }
        }
    }, [shouldConnect, isStreaming, isScreenSharing, isRoomJoined]);

    const shareCameraMode = () => {
        setIsScreenSharing(false);
    };

    const shareScreenMode = () => {
        setIsScreenSharing(true);
    };

    const toggleCall = () => {
        setShouldConnect(!shouldConnect);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        localMicrophoneTrack?.setEnabled(!isMuted);
    };

    useEffect(() => {
        localMicrophoneTrack?.setEnabled(!isMuted);
    }, [isMuted, localMicrophoneTrack]);

    // message sending

    const localUser = {
        uid: client.uid,
        audioTrack: localMicrophoneTrack,
    };

    const findTrackForUser = (uid: string | null | undefined) => {
        if (uid == undefined || uid == null) {
            return { audio: undefined, video: undefined };
        }

        if (uid == client.uid) {
            return { audio: localMicrophoneTrack, video: isScreenSharing ? localScreenShareTrack : localVideoTrack };
        } else {
            let anyUser = remoteUsers.find((u) => u.uid == uid);
            if (anyUser) {
                return { audio: anyUser.audioTrack, video: anyUser.videoTrack };
            } else {
                return { audio: undefined, video: undefined };
            }
        }
    };

    useEffect(() => {
        const listeners = activeListeners.map((user) => {
            const track = findTrackForUser(user.username);
            return {
                user,
                track: track.audio,
                videoTrack: track.video,
            };
        });

        console.log(listeners);

        setActiveAudioListeners(listeners);
    }, [activeListeners, remoteUsers, audioTracks, videoTracks, localMicrophoneTrack, localScreenShareTrack, localVideoTrack]);

    const value = {
        isSocketConnected,
        canChat,
        setCanChat,
        isBalanceLoading,
        isRoomJoined,
        toggleCall,
        isMuted,
        toggleMute,
        isStreaming,
        isScreenSharing,

        messages,
        activeConnections,
        allRoomsCount,
        user,
        textArea,
        showPicker,
        shouldScroll,
        activeListeners: activeAudioListeners,

        startShare,
        stopShare,
        shareCameraMode,
        shareScreenMode,
        setIsMuted,
        setTextArea,
        setShowPicker,
        setShouldScroll,
        sendMessage,
        loadPreviousMessage,
        joinListenerChannel,
        leaveListenerChannel,
    };

    return (
        <ChatRoomContext.Provider value={value}>
            <AgoraRTCScreenShareProvider client={client}>{children}</AgoraRTCScreenShareProvider>
        </ChatRoomContext.Provider>
    );
};
