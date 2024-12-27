import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import React from 'react';

const NLoaderContext = createContext({
  isLoaderOpen: false,
  openLoader: () => {},
  closeLoader: () => {},
});

export default function NLoaderProvider({ children }: PropsWithChildren) {
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const openLoader = useCallback(() => {
    setIsLoaderOpen(true);
  }, []);

  const closeLoader = useCallback(() => {
    setIsLoaderOpen(false);
  }, []);

  return (
    <NLoaderContext.Provider
      value={{
        isLoaderOpen,
        openLoader,
        closeLoader,
      }}
    >
      {children}
    </NLoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(NLoaderContext);
}
