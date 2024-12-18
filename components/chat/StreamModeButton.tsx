'use client';
import React from 'react';

type StreamModeButtonProps = {
    cameraMode: boolean;
    onCameraModeClick: () => void;    
    onScreenModeClick: () => void;    
    size?: 'small' | 'normal';
};

const StreamModeButton = ({ cameraMode, onCameraModeClick, onScreenModeClick,  size = 'normal' }: StreamModeButtonProps) => {
    const sizeClassname = size === 'small' ? 'px-3 py-2 rounded-[18px] h-[30px] min-h-[30px]' : 'px-5 py-3.5 rounded-[18px] h-[35px] min-h-[35px]';

    return (
        <button
            type="button"
            className={`${sizeClassname} whitespace-nowrap gap-2.5  text-base font-bold 
                !bg-blue-400/10 border border-transparent hover:bg-blue-200/20 hover:border-blue-200 transition-all delay-100 active:bg-rose-400/20 active:border active:border-rose-400/70
                ${cameraMode ? 'text-rose-400 !bg-rose-400/20 !border-rose-400/70' : 'text-blue-200'} 
                `}
            onClick={cameraMode ? onScreenModeClick : onCameraModeClick}
        >
            {cameraMode ? 'Share Screen' : 'Share Camera'}
            {cameraMode && <span className="icon-logout" />}
        </button>
    );
};

export default StreamModeButton;
