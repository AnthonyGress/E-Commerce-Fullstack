import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import About from '../app/about/page';

test('About', () => {
    render(<About />);
    expect(screen.getAllByText('About Us')).toBeDefined();
});