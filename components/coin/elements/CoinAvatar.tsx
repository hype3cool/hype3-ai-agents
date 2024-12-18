import { Coin } from '@/types/types';

type CoinAvatarProps = {
    coin: Coin;
    size?: 'small' | 'medium' | 'large';
};

const CoinAvatar = ({ coin, size = 'medium' }: CoinAvatarProps) => {
    let dimensions = 'w-12 h-12';
    if (size === 'small') {
        dimensions = 'w-8 h-8';
    } else if (size === 'large') {
        dimensions = 'w-[60px] h-[60px]';
    }

    return <img className={`${dimensions} rounded-[5px]`} loading="lazy" src={coin?.imageUri || '/assets/images/token-default-avatar.jpeg'} alt={coin?.name} />;
};

export default CoinAvatar;
