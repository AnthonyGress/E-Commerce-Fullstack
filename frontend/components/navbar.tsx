'use client';
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import { useReducer } from 'react';
import { IoCart } from 'react-icons/io5';
import { useTheme } from 'next-themes';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
    const { theme } = useTheme();

    return (
        <NextUINavbar
            isMenuOpen={isMenuOpen}
            maxWidth="xl"
            position="sticky"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-2" color={'foreground'} href="/">
                        <Logo />
                        <p className="font-bold text-inherit">{siteConfig.shortName}</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: 'foreground' }),
                                    'data-[active=true]:text-primary data-[active=true]:font-medium',
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden lg:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-8">
                    <ThemeSwitch />
                    <NextLink className='text-2xl' color="foreground" href={'/checkout'}>
                        <IoCart color={theme === 'light' ? 'black' : 'white'}/>
                    </NextLink>

                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NextLink className='text-2xl' color="foreground" href={'/checkout'} onClick={() => setIsMenuOpen()}>
                    <IoCart color={theme === 'light' ? 'black' : 'white'}/>
                </NextLink>
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="flex flex-col gap-8 items-center justify-center h-svh -mt-10">
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <NextLink className='text-2xl' color="foreground" href={item.href} onClick={() => setIsMenuOpen()}>
                                {item.label}
                            </NextLink>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
