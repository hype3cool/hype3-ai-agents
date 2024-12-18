import React from 'react';

import OutlinedButton from '@/components/elements/buttons/OutlinedButton';
import useSwap from '@/hooks/useSwap';

type SwapOutlinedButtonProps = {
    mint: string;
    symbol: string;
};

const SwapOutlinedButton = ({ mint, symbol }: SwapOutlinedButtonProps) => {
    const { launchTerminal } = useSwap(mint);

    return <OutlinedButton label={`Buy ${symbol}`} onClick={launchTerminal} />;
};

export default SwapOutlinedButton;
