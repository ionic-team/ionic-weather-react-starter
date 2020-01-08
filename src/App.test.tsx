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
    [ 0, 'Tab One' ],
    [ 1, 'Tab Two' ],
    [ 2, 'Tab Three' ],
  ])('contains the proper text for tab %i', (tab, text)=> {
    const { container } = render(<App />);
    const tabs = container.querySelectorAll('ion-tab-button');
    expect(tabs[tab as number].textContent).toEqual(text);
  });

  [
    { tab: 0, text: 'Tab One' },
    { tab: 1, text: 'Tab Two' },
    { tab: 2, text: 'Tab Three' },
  ].forEach(test => it(`displays the proper text for tab ${test.tab} (alt)`, () => {
    const { container } = render(<App />);
    const tabs = container.querySelectorAll('ion-tab-button');
    expect(tabs[test.tab].textContent).toEqual(test.text);
  }));
});
