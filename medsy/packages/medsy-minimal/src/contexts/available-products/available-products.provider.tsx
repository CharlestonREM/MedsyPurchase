import { INITIALIZE_AVAILABLE_PRODUCTS_STATE } from 'constants/available-products-actions';

//>CREATE STEPPER CONTEXT FOR PROVIDING AVAILABLE PRODUCT DATA AND FUNCTIONS
import React, { createContext, useReducer, useContext } from 'react';

//reducer
import { reducer } from './available-products.reducer'

import { useStorage } from 'helpers/use-storage';


// * use createContext to create the initial context object for the provider
export const AvailableProductsContext = createContext({} as any);


//define stepper initial state object configuration
const INITIAL_STATE = {
    availableProducts: []
}

//! DEFINE DISPATCH HANDLER ACTIONS FROM REDUCER FUNCTION BELOW
//> we will need to remove quantity from reducer actions because you can only select one instance of each basepackage or upgrade
const useAvailableProductsActions = (initialAvailableProducts = INITIAL_STATE) => {
    const [state, dispatch] = useReducer(reducer, initialAvailableProducts);

    const rehydrateLocalState = (payload) => {
        dispatch({ type: 'REHYDRATE', payload });
    };

    const initializeAvailableProductsStateHandler = (variables) => {
        console.log('i am initializeAVAILABLEPRODUCTSSTATEhandler', variables)
        dispatch({ type: INITIALIZE_AVAILABLE_PRODUCTS_STATE, payload: variables })
    }
    return {
        state,
        rehydrateLocalState,
        initializeAvailableProductsStateHandler
    };
};




export const AvailableProductsProvider = ({ children }) => {
    const {
        state,
        rehydrateLocalState,
        initializeAvailableProductsStateHandler
    } = useAvailableProductsActions();
    const { rehydrated, error } = useStorage(state, rehydrateLocalState);

    return (
        <AvailableProductsContext.Provider
            value={{
                products: state.products,
                initializeAvailableProductsState: initializeAvailableProductsStateHandler
            }}
        >
            {children}
        </AvailableProductsContext.Provider>
    );
};

//! BELOW IS A CONVENIENCE HELPER FUNCTION TO STREAMLINE THE USE OF THE CALCULATOR CONTEXT IN APPLICATION SUB COMPONENT CONSUMERS OF THE CONTEXT PROVIDER

export const useAvailableProducts = () => useContext(AvailableProductsContext);
