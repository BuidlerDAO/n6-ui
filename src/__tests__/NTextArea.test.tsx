import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NTextarea, TextareaStatus } from '../NTextArea';

describe('Textarea Component', () => {
  test('renders textarea with placeholder', () => {
    render(<NTextarea placeholder="Enter description" />);
    const textareaElement = screen.getByPlaceholderText('Enter description');
    expect(textareaElement).toBeInTheDocument();
  });

  test('handles uncontrolled textarea value', () => {
    render(<NTextarea placeholder="Write here" />);
    const textareaElement = screen.getByPlaceholderText('Write here');
    fireEvent.input(textareaElement, { target: { value: 'User Input' } });
    expect(textareaElement).toHaveValue('User Input');
  });

  test('dynamically resizes textarea', () => {
    render(<NTextarea placeholder="Resize me" />);
    const textareaElement = screen.getByPlaceholderText('Resize me');
    fireEvent.input(textareaElement, { target: { value: 'Line 1\nLine 2\nLine 3' } });
    expect(textareaElement.style.height).not.toBe('auto'); // Dynamic height should be applied
  });

  test('shows error state with bitwise status', () => {
    render(<NTextarea placeholder="Enter description" status={TextareaStatus.Error} />);
    const container = screen.getByPlaceholderText('Enter description').parentElement;
    expect(container).toHaveClass('!border-[#E94344]'); // Check if the error border is applied
  });

  test('shows warning state with bitwise status', () => {
    render(<NTextarea placeholder="Enter description" status={TextareaStatus.Warning} />);
    const container = screen.getByPlaceholderText('Enter description').parentElement;
    expect(container).toHaveClass('!border-[#FF9800]');
  });

  test('shows normal state with bitwise status', () => {
    render(<NTextarea placeholder="Enter description" status={TextareaStatus.Normal} />);
    const container = screen.getByPlaceholderText('Enter description').parentElement;
    expect(container).toHaveClass('border-transparent');
  });

  test('calls onChange with debounced input', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    render(<NTextarea placeholder="Type here" onChange={onChangeMock} />);
    const textareaElement = screen.getByPlaceholderText('Type here');
    fireEvent.input(textareaElement, { target: { value: 'Debounced Input' } });

    jest.runAllTimers();
    expect(onChangeMock).toHaveBeenCalledWith('Debounced Input');
    jest.useRealTimers();
  });
});
