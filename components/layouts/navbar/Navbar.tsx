import Link from 'next/link';

import styled from 'styled-components';
import { Z_INDEX } from 'theme/zIndex';
import { PAGE_LINKS } from '@/constants/constants';
import ConnectButton from '@/components/auth/elements/ConnectButton';
import { ExploreNavItem, SupportNavItem } from './navitem';

import { toggleSidebar } from '@/store/slices/themeConfigSlice';
import { useDispatch } from '@/store';

const Nav = styled.nav`
    z-index: ${Z_INDEX.sticky};
`;

export const PageTabs = () => {
    return (
        <div className="hidden sm:flex space-x-3">
            <Link type="button" className="hype3-top-menu-btn h5" href={PAGE_LINKS.TOKEN_CREATE}>
                Create
            </Link>
            <ExploreNavItem />
            <SupportNavItem />
        </div>
    );
};

const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <>
            <Nav className="w-full fixed bg-dark h-[48px] lg:h-[68px] px-main shadow-sm border-b border-white border-opacity-10">
                <div className="flex h-full flex-nowrap">
                    <div className="flex w-full flex-1 items-center justify-start" style={{ flexShrink: 2 }} id="nav-left-side-container">
                        <div className="flex mr-7 items-center cursor-pointer">
                            <Link href="/" className="main-logo flex shrink-0 items-center">
                                <img src="/assets/images/logo-brand.svg" alt="logo" className="h-6" />
                            </Link>
                            <div className="ml-2.5 w-10 h-4 px-[7px] py-0.5 bg-blue-200/10 rounded-sm border-[0.5px] border-blue-200/10 justify-center items-center gap-2.5 inline-flex">
                                <div className="text-blue-200 text-[10px] font-bold font-figtree uppercase tracking-tight">BETA</div>
                            </div>
                        </div>
                        <div className="hidden lg:flex">
                            <PageTabs />
                        </div>
                    </div>

                    <div id="nav-right-side-container" className="flex w-full flex-1 items-center justify-end" style={{ flexShrink: 2 }}>
                        <div className="flex flex-row" data-gap="12">
                            <div className="hidden lg:flex">
                                <ConnectButton />
                            </div>

                            {/* mobile */}
                            <div className="flex lg:hidden">
                                <button type="button" className="text-blue-200 text-2xl" onClick={() => dispatch(toggleSidebar())}>
                                    <span className="icon-menu2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Nav>
        </>
    );
};

export default Navbar;
