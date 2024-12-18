// import WalletSelectDialog from '@/components/auth/elements/WalletSelectDialog';
import HowToHypeWelcomeDialog from '@/components/elements/HowToHypeWelcomeDialog';
import ContentAnimation from '@/components/layouts/ContentAnimation';
import ContentSidePanelWrapper from '@/components/layouts/ContentSidePanelWrapper';
import MainDialogWrapper from '@/components/layouts/dialogs/MainDialogWrapper';
import Footer from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import MainContainer from '@/components/layouts/MainContainer';
import MobileActionBar from '@/components/layouts/MobileActionBar';
import Overlay from '@/components/layouts/overlay';
import Sidebar from '@/components/layouts/sidebar';

import Portals from '@/components/portals';
import { Fragment } from 'react';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <div className="relative bg-dark">
                <Overlay />

                <MainContainer>
                    <div className="main-content flex min-h-screen flex-col">
                        <Header />
                        <Sidebar />
                        <ContentAnimation>{children}</ContentAnimation>

                        <Footer />
                        <Portals />
                    </div>
                </MainContainer>
                <MobileActionBar />
                
                <MainDialogWrapper />
                {/* <HowToHypeWelcomeDialog /> */}
                
                <ContentSidePanelWrapper />
            </div>
        </Fragment>
    );
}
