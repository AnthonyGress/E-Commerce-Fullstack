import { CustomCard } from '../cards/card';
import { productImages } from '../../constants/products-images';

import { title } from '@/components/primitives';

const getProducts = async () => {
    try {
        return await fetch('http://localhost:3001/product', { cache: 'no-store' }).then((res) => res.json());
    } catch (error) {
        return [];
    }
};

export default async function Shop() {
    const products = await getProducts();

    return (
        <section className="lg:my-0 py-5" id='shop'>
            <div className='flex justify-center flex-col w-full gap-2 items-center mb-8' data-aos="fade-left">
                <h1 className={title()}>Shop</h1>
            </div>
            <div data-aos="zoom-in-up">
                <div className='grid lg:grid-cols-3 gap-10 justify-center mt-16'>
                    {products.length > 0 &&
                    products.map((product: any) =>
                        <CustomCard key={Math.random()} body={product.description} image={productImages.find((p) => p.name === product.name.toLowerCase().replaceAll(' ', ''))?.image} price={product.price} productId={product.id} title={product.name}/>)
                    }
                </div>
                {products.length <= 0 && <div className='flex justify-center'>No items in Shop</div>}
            </div>
        </section>
    );
};
