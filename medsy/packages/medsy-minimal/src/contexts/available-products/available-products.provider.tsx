import { INITIALIZE_AVAILABLE_PRODUCTS_STATE, REMOVE_NO_LAND_BASE_PACKAGES, REMOVE_NO_LAND_UPGRADES, RETURN_NO_LAND_PRODUCTS } from 'constants/available-products-actions';

//>CREATE STEPPER CONTEXT FOR PROVIDING AVAILABLE PRODUCT DATA AND FUNCTIONS
import React, { createContext, useReducer, useContext } from 'react';

//reducer
import { reducer } from './available-products.reducer'

import { useStorage } from 'helpers/use-storage';


// * use createContext to create the initial context object for the provider
export const AvailableProductsContext = createContext({} as any);


//define stepper initial state object configuration
const INITIAL_STATE = {
    availableBasePackages: [],
    availableUpgrades: [],
    allBasePackages: [],
    allUpgrades: []
}

//! DEFINE DISPATCH HANDLER ACTIONS FROM REDUCER FUNCTION BELOW
//> we will need to remove quantity from reducer actions because you can only select one instance of each basepackage or upgrade
const useAvailableProductsActions = (initialAvailableProducts = INITIAL_STATE) => {
    const [state, dispatch] = useReducer(reducer, initialAvailableProducts);

    const rehydrateLocalState = (payload) => {
        dispatch({ type: 'REHYDRATE', payload });
    };

    const initializeAvailableProductsStateHandler = (basePackageList, upgradeList) => {
        console.log('i am initializeAVAILABLEPRODUCTSSTATEhandler', basePackageList, upgradeList)
        dispatch({
            type: INITIALIZE_AVAILABLE_PRODUCTS_STATE, payload: {
                basePackageList: basePackageList,
                upgradeList: upgradeList
            }
        })
    };

    const removeNoLandProductsHandler = (payload) => {
        dispatch({
            type: REMOVE_NO_LAND_BASE_PACKAGES, payload: payload.basePackageList
        })
        dispatch({
            type: REMOVE_NO_LAND_UPGRADES, payload: payload.upgradeList
        })
    }

    const returnNoLandProductsHandler = () => {
        dispatch({ type: RETURN_NO_LAND_PRODUCTS })
    }

    //todo - if twilight base package selected, remove twilight as upgrade option
    //todo - if standard, exterior, or mini selected, disable the other two buttons
    //todo - if zillow3dtour, zillow3dtour+wtv, or matterport selected disable the other options


    return {
        state,
        rehydrateLocalState,
        initializeAvailableProductsStateHandler,
        removeNoLandProductsHandler,
        returnNoLandProductsHandler
    };
};




export const AvailableProductsProvider = ({ children }) => {
    const {
        state,
        rehydrateLocalState,
        initializeAvailableProductsStateHandler,
        removeNoLandProductsHandler,
        returnNoLandProductsHandler
    } = useAvailableProductsActions();
    const { rehydrated, error } = useStorage(state, rehydrateLocalState);

    return (
        <AvailableProductsContext.Provider
            value={{
                availableBasePackages: state.availableBasePackages,
                availableUpgrades: state.availableUpgrades,
                allBasePackages: state.allBasePackages,
                allUpgrades: state.allUpgrades,
                initializeAvailableProductsState: initializeAvailableProductsStateHandler,
                removeNoLandProducts: removeNoLandProductsHandler,
                returnNoLandProducts: returnNoLandProductsHandler
            }}
        >
            {children}
        </AvailableProductsContext.Provider>
    );
};

//! BELOW IS A CONVENIENCE HELPER FUNCTION TO STREAMLINE THE USE OF THE CALCULATOR CONTEXT IN APPLICATION SUB COMPONENT CONSUMERS OF THE CONTEXT PROVIDER

export const useAvailableProducts = () => useContext(AvailableProductsContext);
