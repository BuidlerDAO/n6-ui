import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NChip } from '../NChip';

describe('NChip Component', () => {

  test('truncates the searchTerm if it is longer than 7 characters', () => {
    render(<NChip searchTerm="LongerSearchTerm" onDelete={jest.fn()} onClick={jest.fn()} />);
    const chipText = screen.getByText(/Longer.../i); // Updated check for truncation
    expect(chipText).toBeInTheDocument();
  });

  test('renders the close icon and calls onDelete when clicked', () => {
    const onDeleteMock = jest.fn();
    render(<NChip searchTerm="Test" onDelete={onDeleteMock} onClick={jest.fn()} />);
    const closeButton = screen.getByTestId('close-button'); // Use data-testid instead of role
    fireEvent.click(closeButton);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
