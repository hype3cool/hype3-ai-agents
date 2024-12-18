'use client';

import { useEffect, useLayoutEffect, useState, memo } from 'react';

import { Z_INDEX } from '@/theme/zIndex';

import styled from 'styled-components';
import Navbar from '@/components/layouts/navbar/Navbar';

import { IRootState, useSelector } from '@/store';


const HeaderWrapper = styled.header`
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: ${Z_INDEX.sticky};
`;

const Header = memo(function Header() {
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [isLiveSpaceBannerVisible, setIsLiveSpaceBannerVisible] = useState(themeConfig.topAlertBar);

    useEffect(() => {
        const scrollListener = () => {
            setIsScrolledDown(window.scrollY > 0);
        };
        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
    }, []);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <HeaderWrapper>
            {/* {isLiveSpaceBannerVisible && (
                <div className="w-full bg-blue-200 h-[30px] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full mr-2 red-dot" />
                    <h6 className="text-black font-bold">
                        {isSmallScreen ? 'Live Space is happening.' : 'Live Space is happening. Join the chat to find out what the creators have to say about their new token launch.'}
                    </h6>
                    <span className="text-black font-bold underline ml-1">Click here 🎤</span>
                </div>
            )} */}
            <Navbar />
        </HeaderWrapper>
    );
});

export default Header;
