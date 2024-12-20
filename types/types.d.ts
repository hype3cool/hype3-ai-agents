import { ILocalVideoTrack, IMicrophoneAudioTrack, IRemoteAudioTrack, IRemoteVideoTrack } from 'agora-rtc-react';

export type StatusType = 'idle' | 'loading' | 'success' | 'failure';

export type Signature = {
    blockTime: number;
    confirmationStatus: string;
    err: string | null;
    memo: string | null;
    signature: string;
    slot: number;
};

// above code is the schema of the project model defined in the mongoose schema in nestjs , how to use this schema in the frontend react app by defining the typescript interface for the project model below:
export interface Project {
    _id?: string | null;
    ticker?: string;
    name?: string;
    description?: string;
    tickerProfilePic?: string;
    presaleAddress?: string;
    tokenAddress?: string;
    chain?: ChainType;
    fundRaised?: number;
    fundTarget?: number;
    presaleLink?: string;
    minEntryPriceInNativeToken?: number;
    socials?: SocialProfiles;
    categories?: string[];
    startAt?: Date;
    endAt?: Date;
    isSoldOut?: boolean;
    isRugged?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    twitterPosts?: TwitterPost[];
}

export interface SocialProfile {
    url?: string;
    username?: string;
}

export interface SocialProfiles {
    twitter?: SocialProfile;
    telegram?: SocialProfile;
    discord: ?SocialProfile;
    website?: SocialProfile;
}

export interface TwitterPost {
    _id?: string | null;
    tweetId?: string;
    text?: string;
}

export interface WalletAddress {
    chain: ChainType;
    address: string;
    display: string;
}

export interface User {
    _id?: string | null;
    uid?: number | null;
    privyUserId?: string;
    username?: string | null;
    displayName?: string;
    image?: string;
    walletAddresses: WalletAddress[];
    linkedAccounts: any[];
    isNewUser?: boolean;
    isCreator?: boolean;
    isAdmin?: boolean;
    email?: string; // google email
    oauthId?: string;
    oauthProvider?: string;
    twitter?: {
        id: string;
        name: string; // displayName
        username: string;
        image?: string;
    };
    bookmarkedTokens?: string[];
    favoriteTokens?: string[];
    favouriteTokenDetails?: Token[];
    createdCoins?: Coin[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export interface Token {
    _id: string;
    mint: string;
    chain?: ChainType;
    symbol?: string;
    name?: string;
    isOfficial?: boolean | false;
    user?: User;
    creator?: Creator;
    description?: string | '';
    imageUri?: string | '';
    metadataUri?: string;
    bondingCurve?: string;
    associatedBondingCurve?: string;
    updateAuthorityAddress?: string;
    isMutable?: boolean;
    editionNonce?: number;
    primarySaleHappened?: boolean;
    sellerFeeBasisPoints?: number;
    tokenStandard?: number;
    key?: number;
    model?: string;
    totalSupply?: number | 0;
    marketCap?: number | 0;
    marketCapInUsd?: number;
    socials?: SocialProfiles;
    categories: string[];
    amountToChat?: number | 0;
    topHolders?: Holder[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Holder {
    address: string;
    amount: string;
    decimals: number | 0;
    uiAmount: number | 0;
    uiAmountString: string;
}

export interface Message {
    _id?: string | null;
    content: string;
    sender: User;
    timestamp: Date;
}

export interface Listener {
    user: User;
    track: undefined | null | IRemoteAudioTrack | IMicrophoneAudioTrack;
    videoTrack: undefined | null | IRemoteVideoTrack | ILocalVideoTrack;
}

export interface Version {
    api: {
        version: string;
    };
    frontend: {
        version: string;
    };
}

export interface CoinCreateForm {
    imageUri: string;
    name: string;
    ticker: string;
    description: string;
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
    milestoneShortDescription: string;
    milestoneLongDescription: string;
    presaleEndAt: string;
    presaleStartAt: string;
}

export interface Coin {
    _id?: string | null;
    mint: string;
    solCollectionWallet: string;
    symbol?: string;
    name?: string;
    creator?: User;
    description?: string;
    imageUri?: string | '';
    socials?: SocialProfiles;
    milestones?: Milestone[];
    presaleEndAt: string;
    presaleStartAt?: string;
    // enablePresaleStartAt?: boolean;
    isCreated: boolean; // is token created
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Milestone {
    seq: number;
    shortDescription: string;
    longDescription: string;
    updatedAt: Date;
}

export interface TempCreatorData {
    name: string;
    username: string;
    image: string;
    agentCount: number;
    earned: number;
    twitterUrl?: string;
}
