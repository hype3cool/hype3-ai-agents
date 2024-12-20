'use client'; // This component must be a client component

import { TempCreatorData } from '@/types/types';
import { formatEarnedAmount } from '@/utils/displayUtils';
import Link from 'next/link';
import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface ImageCarouselProps {
    creators: TempCreatorData[]; // Array of image URLs
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 7,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const ImageCarousel = ({ creators }: ImageCarouselProps) => {
    return (
        <Carousel responsive={responsive} autoPlay infinite={true} transitionDuration={500}>
            {creators.map((creatorData, index) => (
                <Link href={`/creator/${creatorData.username}`} key={index}>
                    <div key={index} className="w-full flex justify-start">                        
                        <div className="w-[220px] h-[280px] relative bg-gradient-to-b from-black to-black rounded-lg border border-slate-400/10 overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${creatorData.image})` }}>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black"></div>
                            </div>
                            <div className="left-[17px] top-[199px] absolute">
                                <div className="text-white text-lg font-bold font-figtree leading-tight tracking-tight">
                                    {creatorData.name} <span className="icon-badge text-blue-200/70" />
                                </div>
                                <div className="text-slate-400/80 text-xs font-semibold font-figtree leading-tight tracking-tight">@{creatorData.username}</div>
                            </div>

                            <span className="absolute bottom-3.5 left-[17px] text-blue-200/70 text-xs font-bold font-figtree leading-snug tracking-tight">
                                <span className="icon-robot" /> {creatorData.agentCount}
                            </span>

                            <span className="absolute bottom-3.5 right-3.5 text-blue-200/70 text-xs font-bold font-figtree leading-snug tracking-tight">
                                <span className="icon-wallet" /> {formatEarnedAmount(creatorData.earned)} earned
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
