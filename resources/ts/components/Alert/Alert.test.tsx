import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';

describe('Alert', () => {
  it('renders the Alert component', async () => {
    let container: HTMLElement = null;
    await act(async () => {
      container = render(
        <Alert text="AAA" type="danger" dismissible={true} />
      ).container;
    });
    expect(container.getElementsByClassName('alert').length).toBe(1);
    expect(container.getElementsByClassName('alert-text').length).toBe(1);
    expect(container.getElementsByClassName('btn-close').length).toBe(1);
  });
});
