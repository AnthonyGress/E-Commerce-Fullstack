import Image from 'next/image';

import { title } from '@/components/primitives';

export default function About() {
    return (
        <section className="mb-16" id='about'>
            <div className='flex justify-center flex-col w-full gap-2 items-center'>
                <h1 className={title()} data-aos="fade-right">About Us</h1>
            </div>
            <div className='grid lg:grid-cols-2 gap-10 mt-16' data-aos="fade-up">
                <div className='flex flex-col justify-center' style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image alt='aboutPhoto' height={0} sizes="100vw" src={'/images/about.jpg'} style={{ width: '100%', height: 'auto' }} width={0}/>
                </div>

                <div className={'flex flex-col items-center justify-center gap-6 z-20' }>
                    <p className='text-xl leading-relaxed'>
                        {'Nisi sunt excepteur ea dolore consectetur sint sint. Amet irure sunt ea reprehenderit deserunt proident sunt nisi consectetur cillum. Ipsum aliquip occaecat nulla cillum esse velit pariatur cillum adipisicing culpa ut tempor sint. Nostrud ullamco do ex nostrud reprehenderit ea nisi culpa voluptate nulla.'}
                    </p>
                    <p className='text-xl leading-relaxed'>{'Sunt sint minim aliqua non reprehenderit voluptate voluptate culpa officia dolore dolore exercitation duis. Fugiat adipisicing cillum aliquip ipsum dolore deserunt reprehenderit aliqua occaecat aliqua occaecat. Occaecat sint ex ut fugiat fugiat laboris cillum est sint est nulla adipisicing. Fugiat laborum enim nostrud sit. Aliquip et magna enim mollit incididunt eu ullamco pariatur proident ad consectetur esse. Voluptate nisi id mollit qui nostrud consequat culpa sunt cupidatat.'}.</p>
                </div>
            </div>
        </section>
    );
};
