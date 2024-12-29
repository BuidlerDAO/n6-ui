import { useThrottleFn } from 'ahooks';
import React, { forwardRef, PropsWithChildren, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import cls from 'classnames';

export type NScrollableProps = PropsWithChildren<{
  className?: string;
  scrollToBottomIfNeed?: boolean;
  onNearTop?(): void;
  onNearBottom?(): void;
}>;
export type NScrollableRef = {
  /** Tries to scroll to the bottom, only triggers when near the bottom */
  tryScrollToBottom: () => void;
  reset: () => void;
};
export default forwardRef(function NScrollable(
  { className, children, scrollToBottomIfNeed = false, onNearBottom, onNearTop }: NScrollableProps,
  ref: Ref<NScrollableRef>,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { run: handleScroll } = useThrottleFn(
    // (env: React.UIEvent<HTMLDivElement, UIEvent>) => {
    () => {
      if (rootRef.current == null) return;
      const modifier = 100;
      if (rootRef.current.scrollTop < modifier) {
        // TODO: When paging up, need to position to the previous scroll location
        onNearTop?.();
        return;
      }
      if (rootRef.current.clientHeight + rootRef.current.scrollTop + modifier > rootRef.current.scrollHeight) {
        onNearBottom?.();
        return;
      }
    },
    { wait: 500 },
  );

  useImperativeHandle(
    ref,
    () => ({
      tryScrollToBottom() {
        if (rootRef.current == null) return;
        const isNearBottom =
          // 450 is an approximation
          rootRef.current.clientHeight + rootRef.current.scrollTop + 450 > rootRef.current.scrollHeight;
        if (isNearBottom) {
          rootRef.current.scrollTop = 99999999999;
        }
      },
      reset() {
        isFirstRenderRef.current = 0;
      },
    }),
    [],
  );

  const isFirstRenderRef = useRef<0 | 1 | 2>(0);

  // Scroll to the bottom when children change
  useEffect(() => {
    if (rootRef.current == null) return;
    const root = rootRef.current;
    const observer = new MutationObserver(() => {
      if (isFirstRenderRef.current === 0) {
        isFirstRenderRef.current = 1;
      } else if (isFirstRenderRef.current === 1) {
        root.scrollTop = 99999999999;
        isFirstRenderRef.current = 2;
      }

      if (scrollToBottomIfNeed) {
        // 450 is an approximation
        const isNearBottom = root.clientHeight + root.scrollTop + 450 > root.scrollHeight;
        if (isNearBottom) {
          root.scrollTop = 99999999999;
        }
      }
    });
    observer.observe(root, {
      subtree: true,
      childList: true,
    });
    return () => {
      observer.disconnect();
    };
  }, [scrollToBottomIfNeed]);

  return (
    <div
      ref={rootRef}
      className={cls('relative flex flex-1 flex-col items-center overflow-y-auto', className)}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
});
