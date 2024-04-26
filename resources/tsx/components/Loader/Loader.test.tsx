import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader', () => {
  it('renders the Loader component', () => {
    render(<Loader />);

    // screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
