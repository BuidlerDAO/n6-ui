import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NLoaderProvider, NLoadingScreen, useLoader } from '../NLoader';

const MockLoaderComponent = () => {
  const { openLoader, closeLoader } = useLoader();

  React.useEffect(() => {
    openLoader(); // Open the loader during the test
    return () => closeLoader(); // Close the loader after the test
  }, [openLoader, closeLoader]);

  return <NLoadingScreen />;
};

describe('LoadingScreen Component', () => {
  it('should render the loading spinner and message when isLoaderOpen is true', () => {
    render(
      <NLoaderProvider>
        <MockLoaderComponent />
      </NLoaderProvider>,
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should not render anything when isLoaderOpen is false', () => {
    const { container } = render(
      <NLoaderProvider>
        <NLoadingScreen />
      </NLoaderProvider>,
    );

    expect(container.firstChild).toBeNull(); // Loader should not render anything
  });
});
