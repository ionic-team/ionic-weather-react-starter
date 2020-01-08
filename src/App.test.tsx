import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toBeTruthy();
  });

  it('contains three tabs', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('ion-tab-button').length).toEqual(3);
  });

  it('renders consistently', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it.each([
    [ 0, 'Current Weather' ],
    [ 1, 'Forecast' ],
    [ 2, 'UV Index' ],
  ])('contains the proper text for tab %i', (tab, text)=> {
    const { container } = render(<App />);
    const tabs = container.querySelectorAll('ion-tab-button');
    expect(tabs[tab as number].textContent).toEqual(text);
  });
});
