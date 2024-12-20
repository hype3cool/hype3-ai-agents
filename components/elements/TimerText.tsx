'use client';
import React, { useState, useEffect } from 'react';

type TimerTextProps = {
    endAt: Date;
};

const TimerText = ({ endAt }: TimerTextProps) => {
    const [timePass, setTimePass] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculatetimePass = () => {
            const now = new Date();
            const end = new Date(endAt);
            const timeDifference = end.getTime() - now.getTime();

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimePass({ days, hours, minutes, seconds });
            } else {
                // Handle countdown completion if needed
                setTimePass({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Initial calculation
        calculatetimePass();

        // Update countdown every second
        const intervalId = setInterval(calculatetimePass, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [endAt]);

    return (
        <div className="text-white/90 text-base font-bold">
            {timePass.days > 0 ? `${timePass.days}d` : ''}
            {timePass.days > 0 || timePass.hours > 0 ? ` ${timePass.hours}h` : ''}
            {timePass.days > 0 || timePass.hours > 0 || timePass.minutes > 0 ? ` ${timePass.minutes}m` : ''}
            {timePass.days === 0 && timePass.hours === 0 ? ` ${timePass.seconds}s` : ''}
            {/* {timePass.days === 0 && timePass.hours === 0 && timePass.minutes > 0 ? ` ${timePass.seconds}s` : ''} */}
        </div>
    );
};

export default TimerText;