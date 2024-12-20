import React from 'react';

import styles from './HomePageCaption.module.css';

const HomePageCaption = () => {
    return (
        <h2 className="mt-2 mb-8 base-white sm:text-[20px] md:text-[30px] lg:text-[40px] text-[16px] font-semibold relative">
            Launch AI agent with
            <div className={`${styles['slidingVertical']} whitespace-nowrap`}>
                <span>Token</span>
                <span>Auto Tweeting</span>
                <span>Twitter Space</span>
                <span>Trading</span>
            </div>
        </h2>
    );
};

export default HomePageCaption;
