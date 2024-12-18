import React, { forwardRef } from 'react';

import { dispatch } from '@/store';
import { openSidePanel } from '@/store/slices/menu';
import { Message, Coin } from '@/types/types';

import styles from './ChatMessageRow.module.css';
import { extractTwitterUsername, formatTimestamp } from '@/utils/displayUtils';
import TwitterBadge from '../elements/TwitterBadge';

interface ChatMessageRowProps {
    message: Message;
    coin?: Coin;
}

// const ChatMessageRow: React.FC<ChatMessageRowProps> = ({ message }) => {
const ChatMessageRow = forwardRef<HTMLDivElement, ChatMessageRowProps>(({ message, coin }, ref) => {
    const senderWalletAddress = message?.sender?.walletAddresses[0]?.address || '';
    const senderTwitterUsername = message?.sender?.twitter?.username || '';

    // check if top holders
    // const isWhale = coin?.topHolders?.some((holder) => holder.address === senderWalletAddress);
    const isWhale = false;      // TODO

    // check if developer of the coin
    const coinTwitterUsername = extractTwitterUsername(coin?.socials?.twitter?.url || '');
    const isDev = coinTwitterUsername != '' && senderTwitterUsername === coinTwitterUsername;

    const isWhaleUAT =
        process.env.NEXT_PUBLIC_ENV == 'uat' && (senderWalletAddress === '8RwQvYsbVYJVtDLgMiv84RaJY7q1FQTvEWacxptDqqwk' || senderWalletAddress === 'CMeGQA5np92f13VoNzyLD3RaFAHWAztXJse4jBqyjtMk');

    const isDevUAT =
        process.env.NEXT_PUBLIC_ENV == 'uat' && (senderWalletAddress === '7hCBsq5bZj8Qtq4ZbxUpL796BedYTLdp6C5pTkH766vA' || senderWalletAddress === '8CjkdCNEdECYQQcPA9qdcTvy8TnN9FKEhZdWRDVLdheb');

    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    let borderColor = 'border-transparent';
    let avatar_icon = '';
    let text_color = 'text-white';

    if (isWhale || isWhaleUAT) {
        borderColor = 'border-cyan-400';
        avatar_icon = 'icon-whales';
        text_color = 'text-cyan-400';
    } 

    if (isDev || isDevUAT) {
        borderColor = 'border-orange-400';
        avatar_icon = 'icon-crown2';
        text_color = 'text-orange-400';
    }

    return (
        <div ref={ref} className="flex flex-row items-start gap-y-2 gap-x-4 py-2">
            <div className="flex-shrink-0">
                <button type="button" onClick={() => handleOpenUserProfile(message?.sender)}>
                    <div className={`h-[42px] w-[42px] rounded-full flex items-center justify-center border ${borderColor}`}>
                        <img src={message?.sender?.image || '/assets/images/frog-avatar.png'} alt="img" className="h-9 w-9 rounded-full object-cover" />
                    </div>
                </button>
            </div>

            <div className="flex flex-col w-full sm:w-auto">
                <div className="flex flex-row flex-wrap justify-start items-center gap-x-2">
                    <button type="button" onClick={() => handleOpenUserProfile(message?.sender)}>
                        <h6 className={`base font-semibold ${text_color} flex items-center`}>
                            {avatar_icon && <span className={`${avatar_icon} mr-1`} />}
                            {message?.sender?.username}
                        </h6>
                    </button>
                    {message?.sender?.twitter && message?.sender?.twitter?.name && message?.sender?.twitter?.username && <TwitterBadge username={message?.sender?.twitter?.username} />}
                    <small className="text-white/50 font-semibold">{formatTimestamp(message?.timestamp)}</small>
                </div>
                <h6 className={`${styles['message-row']} font-semibold text-white/70 mt-1`} dangerouslySetInnerHTML={{ __html: message.content }}></h6>
            </div>
        </div>
    );
});

export default ChatMessageRow;
