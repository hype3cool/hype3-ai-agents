import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import styles from './LottieGroup.module.css';

const LottieGroup = () => {
    return (
        <div className="flex flex-row justify-center items-center my-10">
            <div
                style={{
                    transform: 'translate3d(0px, 14px, 0) rotate(2.8deg)',
                    zIndex: 1,
                }}
            >
                <LottieCard lottieUrl="xURXx4yW7o" index={1}>
                    <>
                        <span className="text-blue-200 text-3xl font-normal font-londrina">CONNECT</span>
                        <span className="text-white text-3xl font-normal font-londrina">
                            {' '}
                            TO BECOME
                            <br />
                        </span>
                        <span className="text-blue-200 text-3xl font-normal font-londrina">DEV + CREATOR</span>
                    </>
                </LottieCard>
            </div>

            <div
                style={{
                    transform: 'translate3d(0, 15px, 0) rotate(-8.13deg)',
                    zIndex: 2,
                }}
            >
                <LottieCard lottieUrl="ops1BqFroK" index={2}>
                    <>
                        <span className="text-blue-200 text-3xl font-normal font-londrina">CREATE</span>
                        <span className="text-white text-3xl font-normal font-londrina"> A NEW</span>
                        <span className="text-blue-200 text-3xl font-normal font-londrina">
                            {' '}
                            IP AGENT
                            <br />
                        </span>
                    </>
                </LottieCard>
            </div>
            <div
                style={{
                    transform: 'translate3d(-10px, 4px, 0) rotate(5.2deg)',
                    zIndex: 1,
                }}
            >
                <LottieCard lottieUrl="MvQsF7RPs2" index={3}>
                    <>
                        <span className="text-blue-200 text-3xl font-normal font-londrina">EARN</span>
                        <span className="text-white text-3xl font-normal font-londrina"> ROYALTY AS </span>
                        <span className="text-blue-200 text-3xl font-normal font-londrina">CREATOR</span>
                    </>
                </LottieCard>
                
            </div>
         
        </div>
    );
};

export default LottieGroup;

interface LottieCardProps {
    lottieUrl: string;
    children?: React.ReactNode; // Add children prop
    index?: number;
}
const LottieCard = ({ lottieUrl, children, index }: LottieCardProps) => {
    return (
        <div className="relative w-[413px] h-[150px] bg-black rounded-[20px] shadow-[0px_0px_10px_2px_rgba(3,225,255,0.10)] border border-blue-200/50">
            <div className="absolute left-[-10px] top-[-20px] w-[45px] h-[45px] bg-black rounded-full border border-blue-200/50 flex items-center justify-center text-blue-200 text-2xl font-normal font-londrina leading-snug tracking-wide">
                {index}
            </div>
            <div className="relative flex flex-row items-center p-5">
                <div className="h-24 w-[120px]">
                    <DotLottieReact src={`/assets/images/${lottieUrl}.lottie`} loop autoplay />
                </div>
                <div className="origin-top-left  text-center">{children}</div>
            </div>
        </div>
    );
};
