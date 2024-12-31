import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NSearchInput } from '../NSearchInput';

describe('NSearchInput Component', () => {
  test('renders the search input with the default placeholder', () => {
    render(<NSearchInput />);
    const input = screen.getByPlaceholderText('Search name');
    expect(input).toBeInTheDocument();
  });

  test('allows a custom placeholder to be set', () => {
    render(<NSearchInput placeholder="Custom Placeholder" />);
    const input = screen.getByPlaceholderText('Custom Placeholder');
    expect(input).toBeInTheDocument();
  });

  test('calls onSearch with the correct value after debounce', async () => {
    const onSearchMock = jest.fn();
    render(<NSearchInput onSearch={onSearchMock} debounceTime={300} />);

    const input = screen.getByPlaceholderText('Search name');
    fireEvent.input(input, { target: { value: 'test query' } });

    // Ensure content is updated immediately
    expect(input).toHaveValue('test query');

    // Wait for debounce to trigger onSearch
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledWith('test query'), { timeout: 500 });
  });

  test('clears the input and calls onSearch with an empty string on clear', async () => {
    const onSearchMock = jest.fn();
    render(<NSearchInput onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search name');

    // Simulate user input
    fireEvent.input(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');

    // Clear the input
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledWith(''), { timeout: 500 });
  });

  test('shows and hides clear button based on input value', () => {
    render(<NSearchInput />);

    const input = screen.getByPlaceholderText('Search name');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    fireEvent.input(input, { target: { value: 'test' } });
    expect(screen.getByRole('button')).toBeInTheDocument();

    fireEvent.input(input, { target: { value: '' } });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('applies custom container and input class names', () => {
    const containerClass = 'custom-container';
    const inputClass = 'custom-input';
    render(<NSearchInput containerClassName={containerClass} inputClassName={inputClass} />);

    const container = screen.getByPlaceholderText('Search name').parentElement;
    expect(container).toHaveClass(containerClass);

    const input = screen.getByPlaceholderText('Search name');
    expect(input).toHaveClass(inputClass);
  });

  test('renders with a custom search icon', () => {
    const CustomIcon = () => <div>Custom Icon</div>;
    render(<NSearchInput searchIcon={<CustomIcon />} />);
    expect(screen.getByText('Custom Icon')).toBeInTheDocument();
  });

  test('renders with a custom clear icon', () => {
    const CustomClearIcon = () => <div>Custom Clear</div>;
    render(<NSearchInput clearIcon={<CustomClearIcon />} />);
    fireEvent.input(screen.getByPlaceholderText('Search name'), { target: { value: 'test' } });
    expect(screen.getByText('Custom Clear')).toBeInTheDocument();
  });

  test('handles focus and blur states', () => {
    render(<NSearchInput />);

    const input = screen.getByPlaceholderText('Search name');
    const container = input.parentElement;

    expect(container).toHaveClass('bg-black-2'); // Default background
    fireEvent.focus(input);
    expect(container).toHaveClass('bg-gray-1'); // Focused background

    fireEvent.blur(input);
    expect(container).toHaveClass('bg-black-2'); // Default background
  });
});
