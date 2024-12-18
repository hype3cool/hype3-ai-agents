'use client';

import LoadingSpinner from '@/components/elements/LoadingSpinner';
import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

interface TwitterTimelineProps {
    username: string;
    height?: number;
}

const TwitterTimeline: React.FC<TwitterTimelineProps> = ({ username }) => {
    return (
        <div>
            <TwitterTimelineEmbed sourceType="profile" screenName={username} options={{}} theme="dark" noHeader noFooter noBorders transparent placeholder={<LoadingSpinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />} />
        </div>
    );
};

export default TwitterTimeline;
