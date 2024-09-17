import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Checkout from '../app/checkout/page';

test('Checkout', () => {
    render(<Checkout />);
    expect(screen.getAllByText('Checkout')).toBeDefined();
});