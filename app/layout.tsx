
import ProviderComponent from '@/components/layouts/ProviderComponent';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import NextAuthProvider from '@/components/layouts/NextAuthProvider';
import Script from 'next/script';

export const metadata: Metadata = {
    title: {
        template: '%s | HYPE3',
        default: 'HYPE3',
    },
    description: 'Create a free token pre-launch with auto refund below 85 $SOL raise. Trade on DEX with 100% funded to LP instantly.',
    openGraph: {
        title: 'HYPE3',
        description: 'Create a free token pre-launch with auto refund below 85 $SOL raise. Trade on DEX with 100% funded to LP instantly.',
        url: 'https://hype3.cool',
        images: [
          {
            url:  `${process.env.NEXT_PUBLIC_HOST}/assets/images/hype3-full-logo.png?v=20241024`,
            width: 256,
            height: 256,
            alt: 'Hype3',
          },
        ],
        siteName: 'Hype3.Cool',
      },
    icons: {
        icon: '/favicon.ico',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};


const figtree = Figtree({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-figtree',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" style={{ backgroundColor: '#0D0D0F' }}>
            {/* <head>
                <Script src="https://terminal.jup.ag/main-v3.js" data-preload />
            </head> */}
            <body className={`${figtree.variable}`}>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <NextAuthProvider>
                    <ProviderComponent>
                        {children}
                    </ProviderComponent>
                </NextAuthProvider>
            </body>
        </html>
    );
}
