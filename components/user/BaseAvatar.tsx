import React from 'react';

type BaseAvatarProps = {
    image?: string;
    className?: string;
};

const BaseAvatar = ({ image, className = 'h-9 w-9 object-cover' }: BaseAvatarProps) => {
    return <img loading="lazy" className={`rounded-full ${className}`} src={image || '/assets/images/frog-avatar.png'} />;
};

export default BaseAvatar;
