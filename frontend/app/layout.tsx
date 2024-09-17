import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import Image from 'next/image';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
    title: { default: siteConfig.name, template: `%s • ${siteConfig.name}` },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US'
        },
    },
    openGraph: {
        title: { default: 'Ecommerce Shop', template: '%s' },
        description: siteConfig.description,
        images: [
            {
                type: 'image/png',
                url: '/images/og-image.png',
                width: 2200,
                height: 840
            }
        ]
    },
    keywords: siteConfig.keywords,
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <div className="relative flex flex-col h-[calc(100dvh)]">
                        <Navbar />
                        <Image alt='bg gradient' className='block md:hidden fixed -right-[20rem] z-0 scale-[4] md:scale-[1]' height={1800} src={'/images/gradient-right-dark.svg'} width={1500}/>
                        <Image alt='test' className='fixed sm:left-[45%] z-0 scale-[4] sm:scale-[1.25] top-0 md:-top-[20%]' height={1800} src={'/images/gradient-right-dark.svg'} width={1500}/>
                        <Image alt='bg gradient' className='fixed sm:hidden bottom-0 -left-56 scale-[3]' height={1800} src={'/images/gradient-left-dark.svg'} width={1500}/>
                        <Image alt='bg gradient' className='fixed hidden md:block top-0 -left-64 scale-[1.25]' height={1800} src={'/images/gradient-left-dark.svg'} width={1500}/>
                        <main className="container mx-auto pt-4 px-6 flex-grow">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
