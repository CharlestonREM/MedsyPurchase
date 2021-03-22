import React from 'react';
import { ModalProvider } from 'contexts/modal/modal.provider';


/* 
!--------------------------------
!ADDED IMPORTS BASED ON BRUNO FORMIK-MUI INTEGRATION
!--------------------------------
*/
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import { theme } from 'theme';
import { StepperProvider } from 'contexts/stepper/stepper.provider';
import { CalculatorProvider } from 'contexts/calculator/calculator.provider'
import { AvailableProductsProvider } from 'contexts/available-products/available-products.provider';


// import { GlobalStateProvider } from '@dr.pogodin/react-global-state';


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
    <React.Fragment>
      {/* //! add `ThemeProvider` component that uses theme prop --- bruno */}
      <ThemeProvider theme={theme}>
        {/* //! add CssBaseline component --- bruno */}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StepperProvider>
          <AvailableProductsProvider>
            <CalculatorProvider>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </CalculatorProvider>
          </AvailableProductsProvider>
        </StepperProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}