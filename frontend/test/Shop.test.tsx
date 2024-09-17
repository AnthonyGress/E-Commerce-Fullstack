import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Shop from '../components/views/shop';


test('Shop', async () => {
    const Result = await Shop();

    render(Result);
    expect(screen.getAllByText('Shop')).toBeDefined();
});
