import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NSettingGroup, NSettingGroupItem } from '../NSettingGroup';

describe('NSettingGroup Component', () => {
  test('renders a list of items correctly', () => {
    const items: NSettingGroupItem[] = [
      {
        title: 'Item 1',
        value: 'Value 1',
        action: jest.fn(),
      },
      {
        title: 'Item 2',
        value: 'Value 2',
        action: jest.fn(),
      },
    ];

    render(<NSettingGroup items={items} />);

    // Check that the titles and values of each item are rendered correctly
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
  });

  test('calls action when an item is clicked', () => {
    const actionMock = jest.fn();
    const items: NSettingGroupItem[] = [
      {
        title: 'Item 1',
        value: 'Value 1',
        action: actionMock,
      },
    ];

    render(<NSettingGroup items={items} />);

    // Simulate a click on the first item
    fireEvent.click(screen.getByText('Item 1'));

    // Check if the action function was called
    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});
