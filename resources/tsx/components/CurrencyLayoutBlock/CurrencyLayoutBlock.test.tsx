import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import CurrencyLayoutBlock from "./CurrencyLayoutBlock";

test('renders currencies layout', () => {
    const { container } = render(<CurrencyLayoutBlock />);
    expect(container.getElementsByClassName('currencies-layout').length).toBe(1);
});
