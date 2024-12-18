'use client';

type DisconnectButtonProps = {
    onClick?: () => void;
    className?: string;
};

const DisconnectButton = ({ onClick, className }: DisconnectButtonProps) => {
    return (
        <button type="button" className={`hype3-btn-primary hype3-bg-light-to-teal ${className}`} onClick={onClick}>
            DISCONNECT
        </button>
    );
};

export default DisconnectButton;
