import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Contact from '../app/contact/page';

test('Contact', () => {
    render(<Contact />);
    expect(screen.getAllByText('Contact Us')).toBeDefined();
});