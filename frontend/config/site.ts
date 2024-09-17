export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'E-Commerce Shop',
    shortName: 'E-Commerce Shop',
    description: 'E-Commerce Shop description',
    navItems: [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'About',
            href: '/about',
        },
        {
            label: 'Shop',
            href: '/shop',
        },
        {
            label: 'Contact',
            href: '/contact',
        }
    ],
    url: 'http://localhost',
    keywords: ['ecommerce', 'technology', 'electronics', 'shop', 'used']
};
