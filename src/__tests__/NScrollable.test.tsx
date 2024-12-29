import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { NScrollable } from '../NScrollable';

describe('NScrollable Component', () => {
  test('renders children correctly', () => {
    render(
      <NScrollable>
        <div>Child 1</div>
        <div>Child 2</div>
      </NScrollable>,
    );

    // Verify that both children are rendered
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  test('calls onNearTop when near top of the scrollable container', () => {
    const onNearTopMock = jest.fn();
    const { container } = render(
      <NScrollable onNearTop={onNearTopMock}>
        <div style={{ height: '200px' }}></div> {/* Simulating content */}
      </NScrollable>,
    );

    const scrollableElement = container.firstChild;
    if (scrollableElement && scrollableElement instanceof Element) {
      // Scroll to the top
      fireEvent.scroll(scrollableElement, { target: { scrollTop: 0 } });

      // Ensure onNearTop is called
      expect(onNearTopMock).toHaveBeenCalledTimes(1);
    }
  });

  test('calls onNearBottom when near bottom of the scrollable container', () => {
    const onNearBottomMock = jest.fn();
    const { container } = render(
      <NScrollable onNearBottom={onNearBottomMock}>
        <div style={{ height: '2000px' }}></div> {/* Simulating a large content */}
      </NScrollable>,
    );

    const scrollableElement = container.firstChild;
    if (scrollableElement && scrollableElement instanceof Element) {
      // Scroll to the bottom
      fireEvent.scroll(scrollableElement, { target: { scrollTop: 1999 } });

      // Ensure onNearBottom is called
      expect(onNearBottomMock).toHaveBeenCalledTimes(1);
    }
  });

  test('scrolls to bottom if children change and scrollToBottomIfNeed is true', () => {
    const { container, rerender } = render(
      <NScrollable scrollToBottomIfNeed={true}>
        <div style={{ height: '1000px' }}></div> {/* Initial content */}
      </NScrollable>,
    );

    const scrollableElement = container.firstChild;
    if (scrollableElement && scrollableElement instanceof Element) {
      // Simulate content change
      rerender(
        <NScrollable scrollToBottomIfNeed={true}>
          <div style={{ height: '2000px' }}></div> {/* New content */}
        </NScrollable>,
      );

      // Check if it scrolls to the bottom after rerender
      expect(scrollableElement.scrollTop).toBe(scrollableElement.scrollHeight);
    }
  });
});
