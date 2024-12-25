import classNames from 'classnames';
import uniqBy from 'lodash.uniqby';
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  Children,
} from 'react';
import React from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper as SwiperType } from 'swiper';
type TabChild = React.ReactElement<{ name: string }>;

export enum NTabsState {
  None = 0, // 000
  Big = 1, // 001
  Center = 2, // 010
}

// 定义 NTabs 参数类型
export interface NTabsProps extends PropsWithChildren {
  state?: NTabsState;
  defaultActivePane: string;
  activePane?: string;
  className?: string;
  neck?: ReactNode;
  onChange(name: string): void;
}

const NTabs: React.FC<NTabsProps> = ({
  state = NTabsState.None,
  className,
  children,
  neck,
  defaultActivePane,
  activePane: propActivePane,
  onChange,
}) => {
  const [tabs, setTabs] = useState<{ name: string; title: ReactNode }[]>([]);
  const [internalActivePane, setInternalActivePane] = useState(defaultActivePane);
  const swiperRef = useRef<SwiperRef>(null);

  const activePane = propActivePane ?? internalActivePane;

  const registerTabBar = useCallback((title: ReactNode, name: string) => {
    setTabs((prev) => uniqBy([...prev, { title, name }], (e) => e.name));
  }, []);

  const handleTabClick = (tabName: string, index: number) => {
    if (propActivePane === undefined) {
      setInternalActivePane(tabName);
    }
    onChange(tabName);

    // Slide Swiper to the corresponding tab
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSwiperChange = (swiper: SwiperType) => {
    // Update active tab when swiping
    const newTabName = tabs[swiper.activeIndex].name;
    console.log(newTabName);
    if (newTabName !== activePane) {
      if (propActivePane === undefined) {
        setInternalActivePane(newTabName);
      }
      onChange(newTabName);
    }
  };
  useEffect(() => {
    if (swiperRef.current) {
      const index = tabs.findIndex((tab) => tab.name === activePane);
      if (index !== -1) {
        swiperRef.current.swiper.slideTo(index);
      }
    }
  }, [activePane, tabs]); //

  return (
    <context.Provider value={{ activePane, tabs, registerTabBar }}>
      <div
        className={classNames(
          !!(state & NTabsState.Big) &&
            'overflow-hidden rounded-[100px] border-b-[1px] border-[#FFFFFF1A] bg-black-2 py-[2px]',
          'mb-3 flex h-[28px] w-full',
          className,
        )}
      >
        {tabs.map((tab, idx) => (
          <div
            className={classNames(
              'cursor-pointer',
              'flex items-center justify-center overflow-hidden',
              state & NTabsState.Center ? '' : 'flex-1',
              state & NTabsState.Big ? 'text-xs font-semibold' : 'px-[20px] py-[2px] text-xs',
              state & NTabsState.Big
                ? activePane === tab.name
                  ? 'text-white border-b-2 border-main'
                  : 'text-gray-3'
                : activePane === tab.name
                  ? 'text-white rounded-[100px] bg-gray-2'
                  : 'text-gray-3',
            )}
            key={idx}
            onClick={() => handleTabClick(tab.name, idx)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {neck}
      <Swiper
        className="custom-swiper"
        modules={[Mousewheel]}
        spaceBetween={0}
        loop={false}
        slidesPerView={1}
        mousewheel={{
          forceToAxis: true,
        }}
        ref={swiperRef}
        onSlideChange={handleSwiperChange}
        threshold={5}
        initialSlide={tabs.findIndex((tab) => tab.name === activePane)}
      >
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const tabChild = child as TabChild;
            return <SwiperSlide key={tabChild.props.name}>{tabChild}</SwiperSlide>;
          }
          return null;
        })}
      </Swiper>
    </context.Provider>
  );
};

export type NTabPaneProps = {
  className?: string;
  name: string;
  title: ReactNode;
  children: ReactNode;
};
export function NTabPane({ title, name, children, className }: NTabPaneProps) {
  const { activePane, registerTabBar } = useContext(context);
  useEffect(() => {
    registerTabBar(title, name);
  }, [name, registerTabBar, title]);
  return <div className={classNames(className, activePane !== name && 'hidden')}>{children}</div>;
}

const context = createContext({
  activePane: '',
  tabs: [] as { name: string; title: ReactNode }[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerTabBar: (title: ReactNode, name: string) => {},
});
