import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NTruncatedText } from '../NTruncatedText'; // Adjust the import path accordingly

describe('NTruncatedText Component', () => {
  // Test case 1: Renders the text prop correctly
  test('renders text correctly', () => {
    const text = 'This is a long text for testing truncation behavior in the NTruncatedText component.';
    render(<NTruncatedText text={text} />);

    // Check if the text is rendered
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // Test case 2: Handles the lines prop and truncates text correctly
  test('handles truncation with line-clamp-1', () => {
    const text = 'This is a long text that should be truncated to one line';
    render(<NTruncatedText text={text} lines={1} />);

    // Ensure the line-clamp-1 class is applied for truncation to 1 line
    const element = screen.getByText(text);
    expect(element).toHaveClass('line-clamp-1');
  });

  test('handles truncation with line-clamp-2', () => {
    const text = 'This is a long text that should be truncated to two lines when the lines prop is set to 2';
    render(<NTruncatedText text={text} lines={2} />);

    // Ensure the line-clamp-2 class is applied for truncation to 2 lines
    const element = screen.getByText(text);
    expect(element).toHaveClass('line-clamp-2');
  });

  test('handles truncation with line-clamp-3', () => {
    const text = 'This is a long text that should be truncated to three lines when the lines prop is set to 3';
    render(<NTruncatedText text={text} lines={3} />);

    // Ensure the line-clamp-3 class is applied for truncation to 3 lines
    const element = screen.getByText(text);
    expect(element).toHaveClass('line-clamp-3');
  });

  // Test case 3: Applies custom className and style
  test('applies custom className and style', () => {
    const text = 'This is a long text with custom styles';
    const customClass = 'custom-class';
    const customStyle = { color: 'red' };

    render(<NTruncatedText text={text} className={customClass} style={customStyle} />);

    // Ensure the custom class is applied
    const element = screen.getByText(text);
    expect(element).toHaveClass(customClass);

    // Ensure the custom style is applied
    expect(element).toHaveStyle('color: red');
  });
});
