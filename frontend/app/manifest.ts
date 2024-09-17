import { MetadataRoute } from 'next';

import { siteConfig } from '../config/site';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        description: siteConfig.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '64x64x 48x48 32x32 24x24 16x16',
                type: 'image/x-icon',
            },
            {
                src: '/apple-icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x80',
                type: 'image/png',
            },
            {
                src: '/icon-240x240.png',
                sizes: '240x240',
                type: 'image/png',
            },
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/apple-icon-large.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                type: 'image/png',
                sizes: 'any',
                purpose: 'maskable'
            }
        ],
    };
}
