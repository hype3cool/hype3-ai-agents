import { useEffect, useState } from 'react';

interface CountdownProps {
    createdAt: Date; // Expecting an ISO date string
}

const CreationTimer: React.FC<CountdownProps> = ({ createdAt }) => {
    const [timePass, setTimePass] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculatetimePass = () => {
            const createDate = new Date(createdAt).getTime();
            const now = new Date().getTime();
            const difference = now - createDate;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

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
    }, [createdAt]);

    return (
        <div className="text-white/90 text-base font-bold">
            {timePass.days > 0 ? `${timePass.days}d` : ''}
            {timePass.days > 0 || timePass.hours > 0 ? ` ${timePass.hours}h` : ''}
            {timePass.days > 0 || timePass.hours > 0 || timePass.minutes > 0 ? ` ${timePass.minutes}m` : ''}
            {timePass.days === 0 && timePass.hours === 0 && timePass.minutes === 0 ? ` ${timePass.seconds}s` : ''}
        </div>
    );
};

export default CreationTimer;
