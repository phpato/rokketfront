import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders title of card header', () => {
  render(<Navbar/>);
  const linkElement = screen.getByText(/RokketLabs/i);
  expect(linkElement).toBeInTheDocument();
});
