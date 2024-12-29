import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NSaveButton from '../NButtons/NSaveButton';

describe('NCommonSaveButton Component', () => {
  test('renders with default label', () => {
    render(<NSaveButton onClick={() => {}} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Save');
  });

  test('renders with custom label', () => {
    render(<NSaveButton onClick={() => {}} label="Submit" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Submit');
  });

  test('handles click event', () => {
    const onClickMock = jest.fn();
    render(<NSaveButton onClick={onClickMock} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies custom color class', () => {
    render(<NSaveButton onClick={() => {}} color="text-red-500" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('text-red-500');
  });

  test('applies relative positioning when relative prop is true', () => {
    render(<NSaveButton onClick={() => {}} relative={true} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toHaveClass('absolute');
  });

  test('calls vibrate function when color is text-main and hapticFeedback is provided', () => {
    const vibrateMock = jest.fn();
    const hapticFeedback = { vibrate: () => {} };
    render(
      <NSaveButton onClick={() => {}} color="text-main" hapticFeedback={hapticFeedback} vibrateFn={vibrateMock} />,
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(vibrateMock).toHaveBeenCalledTimes(1);
  });

  test('does not call vibrate function when color is not text-main', () => {
    const vibrateMock = jest.fn();
    const hapticFeedback = { vibrate: () => {} };
    render(
      <NSaveButton onClick={() => {}} color="text-blue-500" hapticFeedback={hapticFeedback} vibrateFn={vibrateMock} />,
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(vibrateMock).not.toHaveBeenCalled();
  });
});
