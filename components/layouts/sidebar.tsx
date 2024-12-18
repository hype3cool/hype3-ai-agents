'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { toggleSidebar } from '@/store/slices/themeConfigSlice';

import { IRootState } from '@/store';
import { useState, useEffect, useCallback } from 'react';

import { SolanaCurrentPriceBadge, SolanaCurrentTpsBadge } from '@/components/elements/solana';
import MobileConnectButton from './header/MobileConnectButton';
import DisconnectButton from '../elements/buttons/DisconnectButton';

import { usePathname, useRouter } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { Z_INDEX } from '@/theme/zIndex';
// import confirmDialog from '../v1/elements/confirm-dialog';
import { useSession } from 'next-auth/react';

import { useAuth } from '../auth/AuthProvider';
import confirmDialog from '../elements/confirm-dialog';
import { HealthService } from '@/services/health.service';
import { Version } from '@/types/types';
import useSolana from '@/hooks/useSolana';


const Sidebar = () => {
    const { logout } = useAuth();
    const router = useRouter();
    const { data: session, status } = useSession();



    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    // confirmation before disconnecting wallet
    const [confirmationModal, setConfirmationModal] = useState<any>(false);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const handleViewProfileClick = () => {
        router.push(`/user/${session?.user?.username}`);
        dispatch(toggleSidebar());
    };

    // confirmation before disconnecting wallet
    const handleOpenConfirmation = () => {
        // dispatch(toggleSidebar());
        setConfirmationModal(true);
    };

    const handleDisconnect = useCallback(async () => {
        logout();
        // signOut();
        // await wallet.disconnect();
        dispatch(toggleSidebar());
        setConfirmationModal(false);
    }, []);

    useEffect(() => {
        if (status === 'authenticated' && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [status]);

    const handleLinkClick = (href: string) => {
        router.push(href);
        dispatch(toggleSidebar());
    };

    // get version
    const [version, setVersion] = useState<Version>();
    useEffect(() => {
        const getVersion = async () => {
            try {
                const response = await new HealthService().getVersion();
                setVersion(response.data);
            } catch (error) {
                setVersion({ api: { version: 'N/A' }, frontend: { version: 'N/A' } });
            }
        };
        getVersion();
    }, []);

    const { priceInUsd, tps } = useSolana();

    return (
        <div style={{ zIndex: Z_INDEX.sidebar }}>
            <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-full shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className="h-full bg-white dark:bg-green-950">
                    <div className="flex items-center justify-end px-4 py-3">
                        <button type="button" className="text-blue-200" onClick={() => dispatch(toggleSidebar())}>
                            <span className="icon-close2 text-xl" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-210px)] mt-6">
                        <ul className="relative space-y-5 py-0">
                            <li className="menu nav-item">
                                <div className="flex-center">
                                    <MobileConnectButton />
                                </div>
                            </li>
                            {session?.user ? (
                                <li>
                                    <div className="flex-center space-x-4 my-4">
                                        <button type="button" className="hype3-btn-primary hype3-bg-light-to-teal !w-[150px]" onClick={handleViewProfileClick}>
                                            VIEW PROFILE
                                        </button>
                                        <DisconnectButton className="!w-[150px]" onClick={handleOpenConfirmation} />
                                    </div>
                                </li>
                            ) : (
                                <li className="py-4">&nbsp;</li>
                            )}
                            <li className="menu nav-item">
                                {/* <Link href="/explore"> */}
                                <button onClick={() => handleLinkClick('/')} className="nav-link">
                                    Home
                                </button>
                            </li>
                            <li className="menu nav-item">
                                {/* <Link href="/explore"> */}
                                <button onClick={() => handleLinkClick('/explore')} className="nav-link">
                                    Explore
                                </button>
                            </li>                            
                            <li className="menu nav-item">
                                <Link href="https://hype3.gitbook.io/hype3/" target="_blank">
                                    How It Works
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="https://t.me/+KIHTtL-bpNYzZjA8" target="_blank">
                                    Support
                                </Link>
                            </li>

                 

                            <li className="menu nav-item !mt-8">
                                <div className="flex justify-center space-x-2">
                                    <Link href="https://x.com/hype3trade" target="_blank" className="text-blue-400 hover:text-blue-400 text-2xl">
                                        <span className="icon-x-twitter"></span>
                                    </Link>

                                    <Link href="https://t.me/HYPE3support" target="_blank" className="text-blue-400 hover:text-blue-400 text-2xl">
                                        <span className="icon-telegram-no-bg"></span>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                    <div className="flex flex-col justify-center items-center px-4 py-3 space-y-6">
                        <div className="grid grid-cols-2 gap-0">
                            <div className="text-right">
                                <SolanaCurrentPriceBadge className="justify-end" price={priceInUsd} />
                            </div>
                            <div className="text-left border-l border-white border-opacity-10">
                                <SolanaCurrentTpsBadge tps={tps} />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="base-text text-white/50 text-[10px] font-semibold">
                                {version?.frontend.version || 'N/A'} (API: {version?.api.version || 'N/A'})
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {confirmDialog('Disconnect wallet?', confirmationModal, setConfirmationModal, handleDisconnect)}
        </div>
    );
};

export default Sidebar;
