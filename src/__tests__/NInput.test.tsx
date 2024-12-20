import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NInput, InputState } from '../NInput';

describe('Input Component', () => {
  test('renders input with placeholder', () => {
    render(<NInput placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  test('handles uncontrolled input value', () => {
    render(<NInput placeholder="Type here" />);
    const inputElement = screen.getByPlaceholderText('Type here');
    fireEvent.input(inputElement, { target: { value: 'User Input' } });
    expect(inputElement).toHaveValue('User Input');
  });

  test('shows error state', () => {
    render(<NInput placeholder="Enter text" state={InputState.Error} />);
    const container = screen.getByPlaceholderText('Enter text').parentElement;
    expect(container).toHaveClass('!border-[#E94344]');
  });

  test('shows disabled state', () => {
    render(<NInput placeholder="Enter text" state={InputState.Disabled} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeDisabled();
    const container = inputElement.parentElement;
    expect(container).toHaveClass('cursor-not-allowed opacity-65');
  });

  test('calls onChange with debounced input', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    render(<NInput placeholder="Type here" onChange={onChangeMock} />);
    const inputElement = screen.getByPlaceholderText('Type here');
    fireEvent.input(inputElement, { target: { value: 'Debounced Input' } });

    jest.runAllTimers();
    expect(onChangeMock).toHaveBeenCalledWith('Debounced Input');
    jest.useRealTimers();
  });
});
