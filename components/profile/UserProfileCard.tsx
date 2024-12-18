'use client';
import React, { useEffect } from 'react';
import WalletAddressChip from '../elements/chips/WalletAddressChip';
import AvatarWithUploadButton from './auth/AvatarWithUploadButton';
import { User } from '@/types/types';

import { setMainDialog } from '@/store/slices/menu';
import { dispatch, IRootState, useSelector } from '@/store';
import { useAuth } from '../auth/AuthProvider';
import { useSession } from 'next-auth/react';
import { DIALOG_NAMES } from '@/constants/constants';

type AuthUserProfileCardProps = {
    user: User;
};

const AuthUserProfileCard = ({ user }: AuthUserProfileCardProps) => {

    const { data: session, status } = useSession();
    const { authUser, getMeStatus } = useSelector((state: IRootState) => state.auth);

    const isAuthUser = status === 'authenticated' && user.username === authUser?.username;
    const hasTwitter = authUser && authUser?.twitter && authUser?.twitter?.id;

    const handleUpdateUsername = () => {
        dispatch(setMainDialog({ type: DIALOG_NAMES.UPDATE_USERNAME, data: { username: user.username } }));
    };

    const handleUploadProfilePic = () => {
        dispatch(setMainDialog({ type: DIALOG_NAMES.UPLOAD_IMAGE, data: {} }));
    };

    const [avatar, setAvatar] = React.useState<string>(user?.image || "");

    useEffect(() => {
        if (isAuthUser && getMeStatus === 'success') {
            setAvatar(authUser?.image || "");
        }
     },[isAuthUser, getMeStatus])

    return (
        // bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70
        <div className="flex flex-col border border-slate-400/10 rounded-tl-lg rounded-tr-lg rounded-bl-[18px] rounded-br-[18px]">
            <div className="relative w-full h-60 bg-gradient-to-b from-black to-black rounded-tl-lg rounded-tr-lg">
                <div className="left-[27px] bottom-[23px] absolute">
                    <div className="flex items-center">
                        <AvatarWithUploadButton imageUrl={avatar} isAuthUser={isAuthUser} onClick={handleUploadProfilePic} />

                        {isAuthUser && (
                            <div className="ml-[13px]">
                                <button onClick={handleUpdateUsername}>
                                    <div className="text-white text-base font-semibold font-figtree leading-tight tracking-tight mb-[11px]">
                                        {user?.username}
                                        <span className="icon-pen text-white/70 text-xs pl-1.5" />
                                    </div>
                                </button>
                                <WalletAddressChip address={user?.linkedAccounts[0]?.address} prefix={''} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="right-[28px] bottom-[19px] absolute">
                    <div className="flex items-center gap-x-2">
                        <span className="icon-warning text-white/70 text-base" />
                        <div className="text-white/70 text-sm font-semibold font-figtree tracking-tight">This creator has yet claimed the profile</div>
                    </div>
                </div>

                {/* <div className="left-[100px] absolute">
                <div className="text-white text-base font-semibold font-figtree leading-tight tracking-tight">testinguser</div>
                </div> */}
            </div>
            {/* <img
                className="w-full h-auto"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7aa177dcfdaed3041daa49a0faaf5ce5189065d1b6932b8696e9a3706865cdc5?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
                alt="Card Image"
            /> */}
            <div className="p-4 md:p-5">
                <div className={`flex items-center ${hasTwitter ? 'justify-between' : 'justify-end'}`}>
                    {authUser && authUser?.twitter && authUser?.twitter?.id && (
                        <div className="flex items-center">
                            <div className="icon-x-twitter text-slate-400 text-4xl mr-2" />
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-white text-lg font-bold font-figtree leading-tight tracking-tight">${authUser?.twitter?.name}</h3>
                                    <div className="ml-1 w-4 h-4 icon-badge text-blue-200" />
                                </div>

                                <span className="text-slate-400/80 text-xs font-semibold font-figtree leading-tight tracking-tight">@${authUser?.twitter?.username}</span>
                            </div>
                        </div>
                    )}
                    <div className="text-right">
                        <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">TOTAL EARNINGS</div>
                        <div>
                            <span className="text-white text-base font-bold font-figtree">$15,508 </span>
                            <span className="text-slate-400/60 text-base font-bold font-figtree">(233 SOL)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthUserProfileCard;
