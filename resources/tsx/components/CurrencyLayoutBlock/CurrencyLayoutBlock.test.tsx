import { vi, describe, it } from 'vitest';
import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyLayoutBlock from './CurrencyLayoutBlock';
import axios from 'axios';
import { ICurrencyJson } from '../../Models/ICurrency';

vi.mock('axios');

describe('CurrencyLayoutBlock', () => {
  it('renders the CurrencyLayoutBlock component', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({
      data: { iso4217: [], currencies: [] } as ICurrencyJson
    });

    let container: HTMLElement = null;
    await act(async () => {
      container = render(<CurrencyLayoutBlock />).container;
    });
    // screen.debug(); // prints out the jsx in the App component unto the command line
    expect(container.getElementsByClassName('currencies-layout').length).toBe(
      1
    );
  });
});
