import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NSaveButton from '../NButtons/NSaveButton';

describe('NSaveButton Component', () => {
  test('renders with default label', () => {
    render(<NSaveButton onClick={() => {}} vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Save');
  });

  test('renders with custom label', () => {
    render(<NSaveButton onClick={() => {}} label="Submit" vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Submit');
  });

  test('handles click event', () => {
    const onClickMock = jest.fn();
    render(<NSaveButton onClick={onClickMock} vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies custom color class', () => {
    render(<NSaveButton onClick={() => {}} color="text-red-500" vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('text-red-500');
  });

  test('applies relative positioning when relative prop is true', () => {
    render(<NSaveButton onClick={() => {}} relative={true} vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toHaveClass('absolute');
  });

  test('calls vibrateFn function when color is text-main and hapticFeedback is provided', () => {
    const vibrateFnMock = jest.fn();
    const mockHapticFeedback = {
      impactOccurred: () => {},
    };

    render(
      <NSaveButton
        onClick={() => {}}
        color="text-main"
        hapticFeedback={mockHapticFeedback}
        vibrateFn={vibrateFnMock}
      />,
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(vibrateFnMock).toHaveBeenCalledWith(mockHapticFeedback);
  });

  test('does not call vibrateFn function when color is not text-main', () => {
    const vibrateFnMock = jest.fn();
    const mockHapticFeedback = {
      impactOccurred: () => {},
    };

    render(
      <NSaveButton
        onClick={() => {}}
        color="text-blue-500"
        hapticFeedback={mockHapticFeedback}
        vibrateFn={vibrateFnMock}
      />,
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(vibrateFnMock).not.toHaveBeenCalled();
  });

  test('renders children instead of label when provided', () => {
    render(
      <NSaveButton onClick={() => {}} vibrateFn={() => {}}>
        <span>Custom Content</span>
      </NSaveButton>,
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Custom Content');
  });

  test('applies custom width and height styles', () => {
    render(<NSaveButton onClick={() => {}} width="100px" height="50px" vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle({
      lineHeight: '50px',
    });
  });

  test('applies auto height when specified', () => {
    render(<NSaveButton onClick={() => {}} height="auto" vibrateFn={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.style.lineHeight).toBe('');
  });
});
