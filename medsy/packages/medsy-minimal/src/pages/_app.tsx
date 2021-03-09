import React from 'react';

import { CartProvider } from 'contexts/cart/cart.provider';
import { DrawerProvider } from 'contexts/drawer/drawer.provider';
import { ModalProvider } from 'contexts/modal/modal.provider';
import { StickyProvider } from 'contexts/sticky/sticky.provider';
import { SearchProvider } from 'contexts/search/use-search';

import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from 'theme';
import { StepperProvider } from 'contexts/stepper/stepper.provider';
import { CalculatorProvider } from 'contexts/calculator/calculator.provider'
import { AvailableProductsProvider } from 'contexts/available-products/available-products.provider';

import { GlobalStateProvider } from '@dr.pogodin/react-global-state';



export default function CustomApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <GlobalStateProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SearchProvider>
            <StickyProvider>
              <DrawerProvider>
                <StepperProvider>
                  <AvailableProductsProvider>
                    <CalculatorProvider>
                      <ModalProvider>
                        <CartProvider>
                          <Component {...pageProps} />
                        </CartProvider>
                      </ModalProvider>
                    </CalculatorProvider>
                  </AvailableProductsProvider>
                </StepperProvider>
              </DrawerProvider>
            </StickyProvider>
          </SearchProvider>
        </ThemeProvider>
      </GlobalStateProvider>
    </React.Fragment>
  );
}
