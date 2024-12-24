import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NCheckbox } from '../NCheckbox';

// Mocking icons for testing
const CheckedIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#33EE94"
    />
    <path
      d="M16.78 6.90214C17.2484 7.19485 17.3907 7.8118 17.098 8.28013L11.473 17.2801C11.3022 17.5534 11.0102 17.7276 10.6886 17.7481C10.3669 17.7686 10.0551 17.6328 9.85107 17.3834L6.47607 13.2584C6.12635 12.8309 6.18935 12.2009 6.61679 11.8512C7.04424 11.5014 7.67426 11.5645 8.02399 11.9919L10.516 15.0377L15.402 7.22013C15.6947 6.7518 16.3117 6.60943 16.78 6.90214Z"
      fill="white"
    />
  </svg>
);

const UncheckedIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="#464646" strokeWidth="2" />
  </svg>
);

describe('NCheckbox Component', () => {
  // Test case 1: Renders with default checked state
  test('renders with default checked state', () => {
    render(
      <NCheckbox
        options={[{ key: '1', label: 'Option 1' }]}
        defaultCheckedKey="1"
        checkedIcon={CheckedIcon}
        uncheckedIcon={UncheckedIcon}
      />,
    );

    // Check that the checked icon is displayed for the default selected option
    const option1 = screen.getByText('Option 1');
    expect(option1).toBeInTheDocument();

    // Check if the CheckedIcon (SVG with a specific path) is rendered for 'Option 1'
    const checkedIcon = screen.getByText('Option 1').previousElementSibling;
    expect(checkedIcon).toContainHTML(
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#33EE94"></path>',
    );
  });

  // Test case 2: Handles selection change and fires onChange
  test('fires onChange when an option is clicked', () => {
    const onChangeMock = jest.fn();

    render(
      <NCheckbox
        options={[
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ]}
        defaultCheckedKey="1"
        onChange={onChangeMock}
        checkedIcon={CheckedIcon}
        uncheckedIcon={UncheckedIcon}
      />,
    );

    // Click on Option 2
    fireEvent.click(screen.getByText('Option 2'));

    // Check that onChange was called with the correct key
    expect(onChangeMock).toHaveBeenCalledWith('2');
  });

  // Test case 3: Renders custom checked and unchecked icons
  test('renders custom checked and unchecked icons', () => {
    render(
      <NCheckbox
        options={[
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ]}
        defaultCheckedKey="1"
        checkedIcon={CheckedIcon}
        uncheckedIcon={UncheckedIcon}
      />,
    );

    // Ensure custom icons are rendered for both options
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    const checkedIcon = screen.getByText('Option 1').previousElementSibling;
    expect(checkedIcon).toContainHTML(
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#33EE94"></path>',
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
    const uncheckedIcon = screen.getByText('Option 2').previousElementSibling;
    expect(uncheckedIcon).toContainHTML('<circle cx="12" cy="12" r="11" stroke="#464646" stroke-width="2"></circle>');
  });
});
