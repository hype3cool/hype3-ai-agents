'use client'
import { useEffect, useState } from 'react'
import { displayTime } from '@/utils/displayUtils';

const Timer = ({ time }: { time: Date | string }) => {

    if (!time) return null;

    const [timeDifference, setTimeDifference] = useState(displayTime(new Date(time!)));

    useEffect(() => {
        const interval = setInterval(() => {
            // check if time pass now, then clear interval
            if (new Date(time!).getTime() < new Date().getTime()) {
                setTimeDifference('')
                clearInterval(interval);
            }

            setTimeDifference(displayTime(new Date(time!)));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <>{timeDifference}</>
    )
}

export default Timer;
