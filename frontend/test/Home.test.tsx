import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from '../app/page';

test('Home', () => {
    render(<Home />);
    expect(screen.getAllByText('E-Commerce')).toBeDefined();
});