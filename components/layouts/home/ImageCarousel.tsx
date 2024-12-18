'use client'; // This component must be a client component

import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface ImageCarouselProps {
    images: string[]; // Array of image URLs
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

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    return (
        <Carousel
            responsive={responsive}
            autoPlay
            infinite={true}
            transitionDuration={500}
            // customLeftArrow={
            //     // hype3-icon-btn hype3-bg-emerald-to-teal
            //     <button type="button" className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full !bg-blue-200/10 hover:bg-blue-400/20" onClick={() => {}}>
            //         <span className="icon-arrow-right text-white text-2xl" />
            //     </button>

            //     //         <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" onClick={() => { }}>
            //     //     <span className="icon-arrow-right text-white text-2xl"/>

            //     // </button>
            // }
        >
            {images.map((image, index) => (
                <div key={index} className="w-full mx-auto flex justify-start">
                    <div className="relative min-w-[220px] h-[280px] rounded-[10px] overflow-hidden border border-slate-400/30 hover:border-blue-200/70">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black"></div>
                        </div>
                        <div className="left-[17px] top-[199px] absolute">
                            <div className="text-white text-lg font-bold font-figtree leading-tight tracking-tight">
                                Elon Musk <span className="icon-badge text-blue-200/70" />
                            </div>
                            <div className="text-slate-400/80 text-xs font-semibold font-figtree leading-tight tracking-tight">@elonmusk</div>
                        </div>

                        <span className="absolute bottom-3.5 left-[17px] text-blue-200/70 text-xs font-bold font-figtree leading-snug tracking-tight">
                            <span className="icon-robot" /> 16
                        </span>

                        <span className="absolute bottom-3.5 right-3.5 text-blue-200/70 text-xs font-bold font-figtree leading-snug tracking-tight">
                            <span className="icon-wallet" /> $1k earned
                        </span>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
