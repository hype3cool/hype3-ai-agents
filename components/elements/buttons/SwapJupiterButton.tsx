import React from 'react';
import useSwap from '@/hooks/useSwap';

type SwapJupiterButtonProps = {
    mint: string;
    className?: string;
};

const SwapJupiterButton = ({ mint, className = 'h-[50px] min-h-[50px] py-2' }: SwapJupiterButtonProps) => {
    const { launchTerminal } = useSwap(mint);

    return (
        <button type="button" className={`w-full mr-6 px-3 ${className} rounded-[10px] !bg-blue-400 text-black`} onClick={launchTerminal}>
            <span className="icon-jupiter mr-2 text-xl" />

            <div className="flex flex-col items-start xs:hidden">
                <div className="text-base font-bold font-figtree leading-[14px] tracking-tight">Swap</div>
                {/* <div className="text-xs font-semibold font-figtree leading-[14px] tracking-tight">via Jupiter</div> */}
            </div>
            <div className="text-base font-bold font-figtree leading-snug tracking-tight hidden xs:block">Swap via Jupiter</div>
        </button>
    );
};

export default SwapJupiterButton;
