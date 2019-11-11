import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container.innerHTML).toBeTruthy();
});

it.each([
  [0, "Tab One"],
  [1, "Tab Two"],
  [2, "Tab Three"]
])("contains the proper text for tab %i", (tab, text) => {
  const { container } = render(<App />);
  expect(
    container.querySelectorAll("ion-tab-button")[tab as number].textContent
  ).toEqual(text);
});

it('renders consistently', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
