import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NAvatar from '../NButtons/NAvatar';

describe('NAvatar Component', () => {
  test('renders with default avatar when image fails to load', () => {
    render(<NAvatar src="invalid_image_url.jpg" defaultAvatar="default_avatar.jpg" alt="Avatar" />);
    const imgElement = screen.getByAltText('Avatar');

    // Simulate image load error
    fireEvent.error(imgElement);

    expect(imgElement).toHaveAttribute('src', 'default_avatar.jpg');
  });

  test('handles click event', () => {
    const onClickMock = jest.fn();
    render(<NAvatar src="valid_image_url.jpg" defaultAvatar="default_avatar.jpg" alt="Avatar" onClick={onClickMock} />);
    const imgElement = screen.getByAltText('Avatar');
    fireEvent.click(imgElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(
      <NAvatar src="valid_image_url.jpg" defaultAvatar="default_avatar.jpg" alt="Avatar" className="custom-class" />,
    );
    const imgElement = screen.getByAltText('Avatar');
    expect(imgElement).toHaveClass('custom-class');
  });
});
