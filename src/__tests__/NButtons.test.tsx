import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NButtons, ButtonState } from '../NButtons';

describe('NButtons Component', () => {
  test('renders button with children content', () => {
    render(<NButtons>Click Me</NButtons>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies default styles', () => {
    render(<NButtons>Default Button</NButtons>);
    const button = screen.getByText('Default Button');
    expect(button).toHaveClass(
      'flex shrink-0 cursor-pointer items-center justify-center px-[20px] py-[10px] text-center text-base font-semibold',
    );
  });

  test('applies small size classes when ButtonState.Small is set', () => {
    render(<NButtons state={ButtonState.Small}>Small Button</NButtons>);
    const button = screen.getByText('Small Button');
    expect(button).toHaveClass('rounded-full bg-[#C379FC1A] !text-xs');
  });

  test('applies large size classes when ButtonState.Small is not set', () => {
    render(<NButtons>Large Button</NButtons>);
    const button = screen.getByText('Large Button');
    expect(button).toHaveClass('h-[50px] rounded-[16px]');
  });

  test('applies custom className', () => {
    render(<NButtons className="custom-class">Custom Class Button</NButtons>);
    const button = screen.getByText('Custom Class Button');
    expect(button).toHaveClass('custom-class');
  });

  test('applies primary type classes when ButtonState.Primary is set', () => {
    render(<NButtons state={ButtonState.Primary}>Primary Button</NButtons>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('text-[black] bg-main');
  });

  test('applies white type classes when ButtonState.White is set', () => {
    render(<NButtons state={ButtonState.White}>White Button</NButtons>);
    const button = screen.getByText('White Button');
    expect(button).toHaveClass('text-[black] bg-[white]');
  });

  test('applies black type classes when ButtonState.Black is set', () => {
    render(<NButtons state={ButtonState.Black}>Black Button</NButtons>);
    const button = screen.getByText('Black Button');
    expect(button).toHaveClass('text-[white] bg-black-1');
  });

  test('button click event triggers onClick function', () => {
    const onClick = jest.fn();
    render(<NButtons onClick={onClick}>Clickable Button</NButtons>);
    const button = screen.getByText('Clickable Button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('disabled button does not trigger onClick function when ButtonState.Disabled is set', () => {
    const onClick = jest.fn();
    render(
      <NButtons state={ButtonState.Disabled} onClick={onClick}>
        Disabled Button
      </NButtons>,
    );
    const button = screen.getByText('Disabled Button');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('applies combined classes when multiple states are set', () => {
    render(<NButtons state={ButtonState.Small | ButtonState.Primary}>Combined Button</NButtons>);
    const button = screen.getByText('Combined Button');
    expect(button).toHaveClass('rounded-full bg-[#C379FC1A] !text-xs');
    expect(button).toHaveClass('text-[black] bg-main');
  });
});
