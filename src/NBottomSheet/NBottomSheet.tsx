'use client';

import React, { useState, forwardRef, useImperativeHandle, PropsWithChildren } from 'react';

interface NBottomSheetProps {
  onClose?: () => void;
  zIndex?: number;
  header?: React.ReactNode;
  className?: string;
  top?: number;
  autoHeight?: boolean;
}

export interface NBottomSheetRefs {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const NBottomSheet = forwardRef<NBottomSheetRefs, PropsWithChildren<NBottomSheetProps>>(
  ({ children, header, zIndex = 999, className, onClose, top = 142, autoHeight }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      toggle: () => {
        setIsOpen(!isOpen);
      },
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    return (
      <>
        <div
          role="dialog"
          className={`fixed inset-x-0 bottom-0 transform text-[#4F4F4F] ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } transition-transform duration-300 ease-in-out`}
          style={{
            zIndex: zIndex + 1,
            transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          }}
        >
          {header}
          <div
            className={`flex flex-col overflow-hidden rounded-tl-[32px] rounded-tr-[32px] bg-[#F5F3F3] ${className}`}
            style={{
              height: !autoHeight ? `calc(100vh - ${top}px)` : 'auto',
            }}
          >
            {children}
          </div>
        </div>
        {isOpen && (
          <div
            className={'fixed inset-0 bg-[white] duration-1000 ease-in-out ' + (isOpen ? 'opacity-35' : 'opacity-0')}
            onClick={() => {
              onClose?.();
              setIsOpen(false);
            }}
            style={{ zIndex, transition: 'opacity 1000ms ease-in-out' }}
          />
        )}
      </>
    );
  },
);

NBottomSheet.displayName = 'NBottomSheet';

export default NBottomSheet;
