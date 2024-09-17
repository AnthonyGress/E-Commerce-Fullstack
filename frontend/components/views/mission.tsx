import { QuotationIcon } from '../icons';

import { title } from '@/components/primitives';

export default function Mission() {
    return (
        <section className="pt-20 mb-16" data-aos="fade-up" id='mission'>
            <div className='flex justify-center mb-8'>
                <h1 className={title()}>Mission</h1>
            </div>
            <div className={'flex flex-col items-center justify-center' }>
                <div className='sm:flex-col md:flex-row md:inline-flex justify-center align-center'>
                    <div className='flex justify-center'>
                        <QuotationIcon />
                    </div>
                    <p className='text-2xl text-center md:w-3/4'>Our mission is to reduce e-waste by providing the best device exchange marketplace
                    </p>

                    <div className='flex justify-center'>
                        <QuotationIcon className='rotate-180' />
                    </div>
                </div>
            </div>
        </section>
    );
};
