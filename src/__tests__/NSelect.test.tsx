import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NSelect, SelectOptions } from '../NSelect';

// Sample options for testing
const sampleOptions: SelectOptions[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

// Mocking the icons used in NSelect
const RightIcon = <span>Right Icon</span>;
const CheckIcon = <span>✔</span>;

describe('NSelect Component', () => {
  // Test case 1: Rendering without options
  test('renders NSelect without options', () => {
    render(<NSelect title="Select an option" RightIcon={RightIcon} CheckIcon={CheckIcon} />);

    // Verify that the NSelect is rendered with the default state (Add a option)
    expect(screen.getByText('Add a')).toBeInTheDocument();
  });

  // Test case 2: Opening the modal when clicked
  test('opens modal when clicked', () => {
    render(<NSelect title="Select an option" options={sampleOptions} RightIcon={RightIcon} CheckIcon={CheckIcon} />);

    // Trigger a click on the select input (the component's div)
    fireEvent.click(screen.getByText('Add a'));

    // Check if the modal is displayed
    expect(screen.getByText('Select an option')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });


  // Test case 3: Check if the left-side custom content is rendered
  test('renders left-side custom content', () => {
    render(
      <NSelect
        title="Select an option"
        leftSide={<span>Custom Left Side</span>}
        options={sampleOptions}
        RightIcon={RightIcon}
        CheckIcon={CheckIcon}
      />,
    );
    // Check if the custom left-side content is rendered
    expect(screen.getByText('Custom Left Side')).toBeInTheDocument();
  });
});
