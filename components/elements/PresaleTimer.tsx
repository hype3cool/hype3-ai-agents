import useCountdown from '@/hooks/useCountdown';
import React from 'react';

interface CountdownProps {
    presaleEndAt: string; // Expecting an ISO date string
    className?: string; // Optional className for styling
    wrapText: string; // Text wrapping around the counter part
}

const PresaleTimer: React.FC<CountdownProps> = ({ presaleEndAt, className, wrapText }) => {
    const timeLeft = useCountdown(presaleEndAt);

    // Constructing the counter part string
    // Constructing the counter part string with conditional logic
    const getCounterPart = () => {
        let counterPart = '';

        if (timeLeft.days > 0) {
            counterPart += `${timeLeft.days}d`;
        }

        if (timeLeft.days > 0 || timeLeft.hours > 0) {
            counterPart += ` ${timeLeft.hours}h`;
        }

        if (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0) {
            counterPart += ` ${timeLeft.minutes}m`;
        }

        if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
            counterPart += ` ${timeLeft.seconds}s`;
        }

        return counterPart.trim(); // Trim any extra spaces
    };

    const counterPart = getCounterPart();

    return (
        <div className={className}>
            {wrapText.replace('%', counterPart)}
        </div>
    );
};

export default PresaleTimer;