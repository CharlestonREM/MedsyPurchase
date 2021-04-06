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
      <ThemeProvider theme={theme}>
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