import React from 'react';
/* 
!--------------------------------
!REMOVED IMPORTS BASED ON BRUNO FORMIK-MUI INTEGRATION
!--------------------------------
 */
//! import 'react-spring-modal/dist/index.css';
//! import 'rc-collapse/assets/index.css';
//! import 'overlayscrollbars/css/OverlayScrollbars.css';
//! import 'react-multi-carousel/lib/styles.css';

//! import 'assets/styles/index.css';
import { CartProvider } from 'contexts/cart/cart.provider';
import { DrawerProvider } from 'contexts/drawer/drawer.provider';
import { ModalProvider } from 'contexts/modal/modal.provider';
import { StickyProvider } from 'contexts/sticky/sticky.provider';
import { SearchProvider } from 'contexts/search/use-search';
//! import 'typeface-open-sans';

/* 
!--------------------------------
!ADDED IMPORTS BASED ON BRUNO FORMIK-MUI INTEGRATION
!--------------------------------
*/
import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from 'theme';
import { StepperProvider } from 'contexts/stepper/stepper.provider';
import { CalculatorProvider } from 'contexts/calculator/calculator.provider'
import { AvailableProductsProvider } from 'contexts/available-products/available-products.provider';

import { GlobalStateProvider } from '@dr.pogodin/react-global-state';


//! added `AppProps` type --> bruno
export default function CustomApp({ Component, pageProps }: AppProps) {
  //! added `React.useEffect` hook to remove the server-side injected css based on bruno
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    //!add `React.Fragment` component wrapper --- bruno */
    <GlobalStateProvider>
      {/* //! add `ThemeProvider` component that uses theme prop --- bruno */}
      <ThemeProvider theme={theme}>
        {/* //! add CssBaseline component --- bruno */}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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
  );
}