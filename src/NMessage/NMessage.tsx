'use client';

import { create } from 'zustand';
import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

function Error() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0003 2.29102L0.916992 19.7077H21.0837L11.0003 2.29102Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.83333"
        strokeLinejoin="round"
      />
      <path d="M11 16.041V16.4993" stroke="white" strokeWidth="1.83333" strokeLinecap="round" />
      <path d="M11 8.70898L11.0038 13.2921" stroke="white" strokeWidth="1.83333" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 25C20.0751 25 25 20.0751 25 14C25 7.92487 20.0751 3 14 3C7.92487 3 3 7.92487 3 14C3 20.0751 7.92487 25 14 25ZM19.1826 9.91716C19.413 9.54016 19.2942 9.04777 18.9172 8.81737C18.5402 8.58698 18.0478 8.70584 17.8174 9.08284L12.8851 17.1538L10.1021 13.9732C9.81112 13.6407 9.30571 13.607 8.9732 13.8979C8.64069 14.1889 8.60699 14.6943 8.89794 15.0268L12.3979 19.0268C12.5656 19.2184 12.8144 19.3188 13.068 19.2971C13.3217 19.2755 13.5499 19.1344 13.6826 18.9172L19.1826 9.91716Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MessageUnavailable() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.1663 14V7.125H13.9997H4.83301V14V20.875H13.9997"
        stroke="#E94344"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3327 17.209L17.666 20.8757"
        stroke="#E94344"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.666 17.209L21.3327 20.8757"
        stroke="#E94344"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.83301 7.125L13.9997 14L23.1663 7.125"
        stroke="#E94344"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getIconByType(type: 'success' | 'error' | 'unavailable' | null) {
  if (type === 'success') return <CheckCircle />;
  if (type === 'error') return <Error />;
  if (type === 'unavailable') return <MessageUnavailable />;
  return null;
}

type StoreType = {
  open: boolean;
  type: 'success' | 'error' | 'unavailable' | null;
  icon: ReactNode;
  title: ReactNode;
  content: ReactNode;
  methods: {
    success(info: { title: ReactNode; content: ReactNode }): void;
    error(info: { title: ReactNode; content: ReactNode }): void;
    toast(info: { icon: ReactNode; title: ReactNode; content: ReactNode }): void;
    unavailable(info: { title: ReactNode; content: ReactNode }): void;
    close(): void;
  };
};

export const useMessageStore = create<StoreType>((set) => ({
  open: false,
  type: null,
  icon: null,
  title: null,
  content: null,
  methods: {
    success({ title, content }) {
      set({ open: true, type: 'success', title, content });
    },
    error({ title, content }) {
      set({ open: true, type: 'error', title, content });
    },
    unavailable({ title, content }) {
      set({ open: true, type: 'unavailable', title, content });
    },
    toast({ icon, title, content }) {
      set({ open: true, icon, title, content });
    },
    close() {
      set({ open: false, type: null, icon: null, title: null, content: null });
    },
  },
}));

export default function Message() {
  const { open, type, icon, title, content, methods } = useMessageStore();

  useEffect(() => {
    let timer: number | undefined;
    if (open) {
      timer = setTimeout(() => {
        methods.close();
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [methods, open]);

  return (
    <div
      className={classNames(
        'fixed left-[10px] right-[10px] top-0 z-[999999999] flex -translate-y-full transform items-center overflow-hidden rounded-[14px] bg-[#2D2D2DCC] px-4 py-[10px] opacity-0 backdrop-blur-[20px] transition-transform duration-300 ease-in-out',
        open && '!translate-y-[20px] opacity-100',
      )}
    >
      <div
        className="mr-3 flex text-[28px] text-main"
        style={{
          alignSelf: type === 'unavailable' ? 'start' : undefined,
        }}
      >
        {getIconByType(type) ?? icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
}
