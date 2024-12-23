import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NSearch, Step } from '../NSearch';

// Mock debounce implementation to ensure that the debounced function gets called
jest.mock('lodash.debounce', () => jest.fn((fn) => fn));

describe('NSearch Component', () => {
  test('renders with the default placeholder', () => {
    render(<NSearch />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  test('allows a custom placeholder to be set', () => {
    render(<NSearch placeholder="Custom Placeholder" />);
    const input = screen.getByPlaceholderText('Custom Placeholder');
    expect(input).toBeInTheDocument();
  });

  test('handles input changes and calls onInput', () => {
    const onInputMock = jest.fn();
    render(<NSearch onInput={onInputMock} />);

    const input = screen.getByPlaceholderText('Search');
    fireEvent.input(input, { target: { value: 'test query' } });

    expect(input).toHaveValue('test query');
    expect(onInputMock).toHaveBeenCalledWith('test query');
  });

  test('calls onSearch after debounce when Enter key is pressed', async () => {
    const onSearchMock = jest.fn();
    render(<NSearch onSearch={onSearchMock} debounceTime={300} />);

    const input = screen.getByPlaceholderText('Search');
    fireEvent.input(input, { target: { value: 'test query' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(onSearchMock).toHaveBeenCalledWith('test query'), { timeout: 500 });
  });

  test('applies custom container and input class names', () => {
    const containerClass = 'custom-container';
    const inputClass = 'custom-input';
    render(<NSearch containerClassName={containerClass} inputClassName={inputClass} />);

    const container = screen.getByPlaceholderText('Search').parentElement;
    expect(container).toHaveClass(containerClass);

    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveClass(inputClass);
  });

  test('renders with a custom clear icon', () => {
    const CustomClearIcon = () => <div>Custom Clear</div>;
    render(<NSearch rightIcon={<CustomClearIcon />} />);

    fireEvent.input(screen.getByPlaceholderText('Search'), { target: { value: 'test' } });
    expect(screen.getByText('Custom Clear')).toBeInTheDocument();
  });

  test('handles focus and blur states', () => {
    render(<NSearch />);

    const input = screen.getByPlaceholderText('Search');
    const container = input.parentElement;

    expect(container).toHaveClass('bg-black-2'); // Default background
    fireEvent.focus(input);
    expect(container).toHaveClass('bg-gray-1'); // Focused background

    fireEvent.blur(input);
    expect(container).toHaveClass('bg-black-2'); // Default background
  });

  test('handles Step.Empty state and clears input', () => {
    render(<NSearch step={Step.Empty} />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveValue('');
  });

  test('renders correctly when searchWord is passed as prop', () => {
    render(<NSearch searchWord="Initial search text" />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveValue('Initial search text');
  });
});
