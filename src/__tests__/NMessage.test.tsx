import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NMessage, useMessageStore } from '../NMessage';

describe('Message Component', () => {
  it('renders success toast correctly', () => {
    const { methods } = useMessageStore.getState();

    act(() => {
      methods.success({ title: 'Success', content: 'This is a success message.' });
    });

    render(<NMessage />);

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('This is a success message.')).toBeInTheDocument();
  });

  it('auto-closes after 2 seconds', () => {
    jest.useFakeTimers();
    const { methods } = useMessageStore.getState();

    act(() => {
      methods.success({ title: 'Closing Soon', content: 'This will close.' });
    });

    render(<NMessage />);
    expect(screen.getByText('Closing Soon')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText('Closing Soon')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
