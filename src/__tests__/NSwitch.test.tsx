import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NSwitch } from '../NSwitch';

describe('Switch Component', () => {
  test('toggles state on click', () => {
    const onChangeMock = jest.fn();
    render(<NSwitch defaultChecked={false} onChange={onChangeMock} />);
    const switchElement = screen.getByRole('button');

    fireEvent.click(switchElement);
    expect(switchElement).toHaveClass('bg-main');
    expect(onChangeMock).toHaveBeenCalledWith(true);

    fireEvent.click(switchElement);
    expect(switchElement).toHaveClass('bg-[#FFFFFF1A]');
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });
});
