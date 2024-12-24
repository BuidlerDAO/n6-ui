import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NModal } from '../NModal';

describe('NModal Component', () => {
  test('renders the modal when open and calls onClose when overlay is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <NModal open={true} onClose={onCloseMock} footer={<div>Footer Content</div>}>
        Modal Content
      </NModal>,
    );

    // Check if the modal content is displayed
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();

    // Simulate clicking the overlay
    const overlay = screen.getByRole('button', { hidden: true });
    fireEvent.click(overlay);

    // Ensure onClose is called
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('does not render the modal when `open` is false and `unmountOnClose` is true', () => {
    render(
      <NModal open={false} unmountOnClose={true}>
        Modal Content
      </NModal>,
    );

    // Modal should not be in the DOM
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});
