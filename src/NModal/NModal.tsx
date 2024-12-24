'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

export type NModalProps = {
  zIndex?: number;
  open: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?(): void;
  unmountOnClose?: boolean;
  stableHeight?: number;
  viewportChangeListener?: (callback: () => void) => void;
};

export default function NModal({
  zIndex = 999,
  footer,
  open,
  children,
  onClose,
  unmountOnClose = true,
  stableHeight = 0,
  viewportChangeListener,
}: NModalProps) {
  const [innerOpen, setInnerOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  const stableHeightRef = useRef(stableHeight);

  useEffect(() => {
    if (open) {
      setTimeout(() => setInnerOpen(true), 100);
    } else {
      setInnerOpen(false);
      setH(0);
    }
  }, [open]);

  useEffect(() => {
    stableHeightRef.current = stableHeight;
  }, [stableHeight]);

  useEffect(() => {
    if (!viewportChangeListener || !open) return;

    function listener() {
      // Logic for handling viewport changes
      if (window.innerHeight < stableHeightRef.current) {
        setH(stableHeightRef.current - window.innerHeight - window.scrollY);
      } else {
        setH(0);
        window.scrollTo(0, 0);
      }
    }

    viewportChangeListener(listener);

    return () => {
      viewportChangeListener(() => {}); // Cleanup listener
    };
  }, [viewportChangeListener, open]);

  if (!open && unmountOnClose) return null;

  return createPortal(
    <div style={{ display: !open && !unmountOnClose ? 'none' : 'block' }}>
      <div
        className="fixed left-0 top-0 z-[998] h-full w-full cursor-pointer bg-[white] opacity-35"
        role="button"
        onClick={() => {
          if (h !== 0) return; // Prevent closing when keyboard is open
          onClose?.();
        }}
        style={{ zIndex }}
      />
      <div
        className={classNames(
          'absolute bottom-0 left-0 z-[998] flex w-full transform flex-col rounded-t-[20px] bg-black-2 px-[16px] py-[20px] transition-transform duration-300 ease-in-out',
          innerOpen ? 'translate-y-0' : 'translate-y-full',
        )}
        style={{ zIndex, maxHeight: 'calc(100vh - 68px)', transform: `translateY(-${h}px)` }}
      >
        <div className="scrollbar-width-none flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="my-[20px]" ref={ref}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
