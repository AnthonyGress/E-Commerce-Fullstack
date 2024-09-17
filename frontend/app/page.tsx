import Home from '../components/views/home';
import Mission from '../components/views/mission';

import { Footer } from '@/components/footer';
import AOSComponent from '@/components/animate';

export default function Page() {
    return (
        <>
            <AOSComponent>
                <Home />
                <Mission />
                <Footer />
            </AOSComponent>
        </>
    );
}
