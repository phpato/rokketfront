import { render, screen } from '@testing-library/react';
import Book from './Book';

test('renderes info o a book passed in props', () => {
  const mockData = {
    author: "Dostoievski",
    title: "Crimen y castigo",
    description: "Good book"
  };
  render(<Book data={mockData} />);
  const linkElement = screen.getByText(/Titulo: Crimen y castigo/i);
  expect(linkElement).toBeInTheDocument();
});
