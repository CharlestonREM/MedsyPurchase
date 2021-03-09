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

//> react global state
import { GlobalStateProvider } from '@dr.pogodin/react-global-state';



export default function CustomApp({ Component, pageProps }: AppProps) {
  //! added `React.useEffect` hook to remove the server-side injected css based on bruno
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // //>set up renderServierside constants
  // let render;
  // const ssrContext = { state: {} };
  // //>set up globalstate for loop
  // for (let round = 0; round < 3; round += 1) {
  //   render = (
  //     <GlobalStateProvider
  //       initialState={ssrContext.state}
  //       ssrContext={ssrContext}
  //     >

  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  //       <SearchProvider>
  //         <StickyProvider>
  //           <DrawerProvider>
  //             <StepperProvider>
  //               <AvailableProductsProvider>
  //                 <CalculatorProvider>
  //                   <ModalProvider>
  //                     <CartProvider>
  //                       <Component {...pageProps} />
  //                     </CartProvider>
  //                   </ModalProvider>
  //                 </CalculatorProvider>
  //               </AvailableProductsProvider>
  //             </StepperProvider>
  //           </DrawerProvider>
  //         </StickyProvider>
  //       </SearchProvider>
  //     </ThemeProvider>
  //     </GlobalStateProvider>
  //   );
  //   if (ssrContext.dirty) {
  //     await Promise.allSettled(ssrContext.pending);
  //   } else break;
  // }
  // return { render, state: ssrContext.state };


  return (
    //!add `React.Fragment` component wrapper --- bruno */
    <React.Fragment>
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
    </React.Fragment>
  );


}//end of CustomApp Functional Component execution block
