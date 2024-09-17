
import Image from 'next/image';
import { button as buttonStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import { Button } from '@nextui-org/button';

import { title } from '@/components/primitives';

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 md:h-[calc(85lvh)] w-full mb-16 md:mb-0">
            <Image alt='catalyx logo' className='animate-spin-slow mb-4 md:mb-12' height='140' src='/logo.png' width='140'/>
            <div className="inline-block bg-transparent">
                <h1 className={`${title({ color: 'violet' })} mb-5`}>E-Commerce&nbsp;</h1>
                <h1 className={`${title()} mb-5`}>Shop</h1>
            </div>
            <div className="inline-block max-w-xlg text-center justify-center bg-transparent">
                <h1 className={title({ size: 'sm' })}>Sustainable&nbsp;</h1>
                <h1 className={title({ color: 'violet', size: 'sm' })}>Electronics&nbsp;</h1>
                <br />
                <h2 className={'mt-12 mb-12 md:mt-20 md:mb-20 text-2xl' }>
                Buy, Sell, and Trade - Electronic Devices
                </h2>
            </div>


            <div className='mb-2'>
                <NextLink href={'/shop'}>
                    <Button
                        className={`${buttonStyles({
                            color: 'primary',
                            radius: 'full',
                            variant: 'solid',
                            size: 'lg'
                        })} text-white`}
                    >
                                  Shop Now!
                    </Button>
                </NextLink>
            </div>

        </section>
    );
}
