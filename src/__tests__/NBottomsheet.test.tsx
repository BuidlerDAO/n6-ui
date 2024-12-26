import { render, screen, act } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { NBottomSheet, NBottomSheetRefs } from '../NBottomSheet';
describe('NBottomSheet Component', () => {
  let bottomSheetRef: React.RefObject<NBottomSheetRefs>;

  beforeEach(() => {
    bottomSheetRef = React.createRef();
  });

  test('renders and is initially closed', () => {
    render(
      <NBottomSheet ref={bottomSheetRef}>
        <div>Test Content</div>
      </NBottomSheet>,
    );

    // The bottom sheet should initially be hidden
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('translate-y-full');
  });

  test('opens when open method is called', () => {
    render(
      <NBottomSheet ref={bottomSheetRef}>
        <div>Test Content</div>
      </NBottomSheet>,
    );

    act(() => {
      bottomSheetRef.current?.open();
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('translate-y-0');
  });

  test('closes when close method is called', () => {
    render(
      <NBottomSheet ref={bottomSheetRef}>
        <div>Test Content</div>
      </NBottomSheet>,
    );

    act(() => {
      bottomSheetRef.current?.open(); // Open first
      bottomSheetRef.current?.close(); // Then close
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('translate-y-full');
  });

  test('toggles visibility when toggle method is called', () => {
    render(
      <NBottomSheet ref={bottomSheetRef}>
        <div>Test Content</div>
      </NBottomSheet>,
    );

    act(() => {
      bottomSheetRef.current?.toggle(); // Toggle to open
    });

    let dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('translate-y-0');

    act(() => {
      bottomSheetRef.current?.toggle(); // Toggle to close
    });

    dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('translate-y-full');
  });
});
