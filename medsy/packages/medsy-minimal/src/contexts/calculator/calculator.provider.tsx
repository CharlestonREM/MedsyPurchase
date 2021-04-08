//IMPORT CONSTANTS
import {
    REHYDRATE, TOGGLE_CALCULATOR, ADD_PRODUCT, REMOVE_PRODUCT, REMOVE_PRODUCTS_OF_SERVICE_TYPE, CLEAR_PRODUCT_FROM_CALCULATOR, CLEAR_CALCULATOR, APPLY_DISCOUNT_CONDITION, REMOVE_DISCOUNT_CONDITION, UPDATE_PROPERTY_TYPE, UPDATE_PROPERTY_SIZE, RESET_PROPERTY_TYPE, RESET_PROPERTY_SIZE, GET_SQUARE_FOOTAGE_LEVELS, GET_TOTAL_PRICE, INITIALIZE_CALCULATOR_VARIABLES
} from 'constants/actions';
//necessary imports
import React, { useReducer, useContext, createContext, useEffect, useMemo } from 'react';

//> the reducer is based on the calculator.reducer as a boilerplate
import { reducer, calculatorProductsTotalPrice } from './calculator.reducer';

//> medsybp (medsy boilerplate) created helper functions using  localForage, a storage library for javascript
//info https://github.com/localForage/localForage
import { useStorage } from 'helpers/use-storage';
import { getSquareFootage } from 'helpers/product-list/get-square-footage-data';

//info `React.createContext` creates a Context object. when react renders a component that subscribes to this context object, it wil read the current context value from the closest matching Provider above it in the tree.
//info use React.createContext
//> use an empty object because dispatches are going to be defined in `useCalculatorActions` which returns a configuration object of key,value pairs for defining helper methods via various specified handlers
// * use createContext to create the initial context object for the provider
export const CalculatorContext = createContext({} as any);


//! INITIAL STATE DEFINED BELOW
const INITIAL_STATE = {
    propertyType: 'house',
    //defaults to `Lvl` square foot range of 0, which if propertyType is house, corresponds to under 2000 sq ft and thus has a zero value for the adjustment multiplier
    propertySize: 0,
    products: [],
    //TODO - consider initialValue being an empty array, instead of null because we can have multiple conditions but medsybp limited the application of only one discountCondition at a time
    discountCondition: null,
    squareFootageLevels: [],
    license: 'single',
    licenseOptions: []
};


//! DEFINE DISPATCH HANDLER ACTIONS FROM REDUCER FUNCTION BELOW
//> we will need to remove quantity from reducer actions because you can only select one instance of each basepackage or upgrade
const useCalculatorActions = (initialCalculator = INITIAL_STATE) => {
    const [state, dispatch] = useReducer(reducer, initialCalculator);

    const addProductHandler = (product, quantity = 1) => {
        // object deconstruction takes the product object and makes each property of product be a property of payload here with quantity being the last property added
        dispatch({ type: 'ADD_PRODUCT', payload: { ...product, quantity } });
    };

    const removeProductHandler = (product, quantity = 1) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: { ...product, quantity } });
    };

    const removeProductsofServiceTypeHandler = (service) => {
        dispatch({ type: REMOVE_PRODUCTS_OF_SERVICE_TYPE, payload: service })
    }

    const clearProductFromCalculatorHandler = (product) => {
        dispatch({ type: 'CLEAR_PRODUCT_FROM_CALCULATOR', payload: product });
    };

    const clearCalculatorHandler = () => {
        dispatch({ type: 'CLEAR_CALCULATOR' });
    };
    const toggleCalculatorHandler = () => {
        dispatch({ type: 'TOGGLE_CALCULATOR' });
    };
    const discountConditionHandler = (discountCondition) => {
        dispatch({ type: 'APPLY_DISCOUNT_CONDITION', payload: discountCondition });
    };
    const removeDiscountConditionHandler = () => {
        dispatch({ type: 'REMOVE_DISCOUNT_CONDITION' });
    };
    const rehydrateLocalState = (payload) => {
        dispatch({ type: 'REHYDRATE', payload });
    };
    //? could this have something to do with items being retained too long in the calculator provider via local storage?
    const isInCalculatorHandler = (id) => {
        return state.products?.some((product) => product.id === id);
    };
    const getProductHandler = (id) => {
        return state.products?.find((product) => product.id === id);
    };
    //this handler precedes discounts
    //we don't need this handler 
    const getCalculatorProductsPrice = () => calculatorProductsTotalPrice(state).toFixed(2);
    //this handler factors in discounts
    //> we should only need this because we always need to be aware of discount conditions
    const getCalculatorProductsTotalPrice = () =>
        calculatorProductsTotalPrice(state).toFixed(2);

    const getDiscount = () => {
        const total = calculatorProductsTotalPrice(state);
        const discount = state.discountCondition
            ? (total * Number(state.discountCondition?.discountInPercent)) / 100
            : 0;
        return discount.toFixed(2);
    };
    //handlers for property type and size 
    const updatePropertyTypeHandler = (propertyType: string) => {
        //fires during radio tabs `onChange` event
        dispatch({ type: 'UPDATE_PROPERTY_TYPE', payload: propertyType })
    };
    const updatePropertySizeHandler = (propertySize: number) => {
        //fires during discrete slider `onChange` event
        dispatch({ type: 'UPDATE_PROPERTY_SIZE', payload: propertySize })
    }
    const resetPropertyTypeHandler = () => {
        dispatch({ type: 'RESET_PROPERTY_TYPE' });
    }
    const resetPropertySizeHandler = () => {
        dispatch({ type: 'RESET_PROPERTY_SIZE' });
    }
    const getSquareFootageLevelsHandler = (squareFootageLevels: any[]) => {
        dispatch({ type: 'GET_SQUARE_FOOTAGE_LEVELS', payload: squareFootageLevels })
    }
    const initializeCalculatorVariablesHandler = (license, squareFootage) => {
        // console.log('i am being initialized....')
        // console.log(license)
        dispatch({ type: INITIALIZE_CALCULATOR_VARIABLES, payload: { license: license, squareFootage: squareFootage } })
    }
    const getProductsCount = state.products?.reduce(
        (acc, product) => acc + product.quantity,
        0
    );
    return {
        state,
        getProductsCount,
        rehydrateLocalState,
        addProductHandler,
        removeProductHandler,
        removeProductsofServiceTypeHandler,
        clearProductFromCalculatorHandler,
        clearCalculatorHandler,
        isInCalculatorHandler,
        getProductHandler,
        toggleCalculatorHandler,
        getCalculatorProductsTotalPrice,
        getCalculatorProductsPrice,
        discountConditionHandler,
        removeDiscountConditionHandler,
        getDiscount,
        updatePropertyTypeHandler,
        updatePropertySizeHandler,
        resetPropertyTypeHandler,
        resetPropertySizeHandler,
        getSquareFootageLevelsHandler,
        initializeCalculatorVariablesHandler
    };
};

//! DEFINE PROVIDER AND INCLUDE METHOD HANDLER DEFINITION
export const CalculatorProvider = ({ children }) => {
    const {
        state,
        rehydrateLocalState,
        getProductsCount,
        addProductHandler,
        removeProductHandler,
        removeProductsofServiceTypeHandler,
        clearProductFromCalculatorHandler,
        clearCalculatorHandler,
        isInCalculatorHandler,
        getProductHandler,
        toggleCalculatorHandler,
        getCalculatorProductsTotalPrice,
        discountConditionHandler,
        removeDiscountConditionHandler,
        getCalculatorProductsPrice,
        getDiscount,
        updatePropertyTypeHandler,
        updatePropertySizeHandler,
        resetPropertyTypeHandler,
        resetPropertySizeHandler,
        getSquareFootageLevelsHandler,
        initializeCalculatorVariablesHandler
    } = useCalculatorActions();
    const { rehydrated, error } = useStorage(state, rehydrateLocalState);

    // const context = useMemo(() => ({
    //     isOpen: state.isOpen,
    //     products: state.products,
    //     propertyType: state.propertyType,
    //     propertySize: state.propertySize,
    //     discountCondition: state.discountCondition,
    //     calculatorProductsCount: state.products?.length,
    //     productsCount: getProductsCount,
    //     squareFootageLevels: state.squareFootageLevels,
    //     license: state.license,
    //     licenseOptions: state.licenseOptions,
    //     //for now this is our first entry point into testing calculator
    //     addProduct: addProductHandler,
    //     removeProduct: removeProductHandler,
    //     removeProductsOfServiceType: removeProductsofServiceTypeHandler,
    //     removeProductFromCalculator: clearProductFromCalculatorHandler,
    //     clearCalculator: clearCalculatorHandler,
    //     isInCalculator: isInCalculatorHandler,
    //     getProduct: getProductHandler,
    //     toggleCalculator: toggleCalculatorHandler,
    //     //> this is the only one we need because it applies discounts
    //     calculatePrice: getCalculatorProductsTotalPrice,
    //     //> `subTotal` method is unnecessary for our app
    //     calculateSubTotalPrice: getCalculatorProductsPrice,
    //     applyDiscountCondition: discountConditionHandler,
    //     removeDiscountCondition: removeDiscountConditionHandler,
    //     calculateDiscount: getDiscount,
    //     updatePropertyType: updatePropertyTypeHandler,
    //     updatePropertySize: updatePropertySizeHandler,
    //     resetPropertyType: resetPropertyTypeHandler,
    //     resetPropertySize: resetPropertySizeHandler,
    //     getSquareFootageLevels: getSquareFootageLevelsHandler,
    //     initializeCalculatorVariables: initializeCalculatorVariablesHandler
    // }), [state.squareFootageLevels, state.licenseOptions])


    return (
        <CalculatorContext.Provider
            value={{
                isOpen: state.isOpen,
                products: state.products,
                propertyType: state.propertyType,
                propertySize: state.propertySize,
                discountCondition: state.discountCondition,
                calculatorProductsCount: state.products?.length,
                productsCount: getProductsCount,
                squareFootageLevels: state.squareFootageLevels,
                license: state.license,
                licenseOptions: state.licenseOptions,
                //for now this is our first entry point into testing calculator
                addProduct: addProductHandler,
                removeProduct: removeProductHandler,
                removeProductsOfServiceType: removeProductsofServiceTypeHandler,
                removeProductFromCalculator: clearProductFromCalculatorHandler,
                clearCalculator: clearCalculatorHandler,
                isInCalculator: isInCalculatorHandler,
                getProduct: getProductHandler,
                toggleCalculator: toggleCalculatorHandler,
                //> this is the only one we need because it applies discounts
                calculatePrice: getCalculatorProductsTotalPrice,
                //> `subTotal` method is unnecessary for our app
                calculateSubTotalPrice: getCalculatorProductsPrice,
                applyDiscountCondition: discountConditionHandler,
                removeDiscountCondition: removeDiscountConditionHandler,
                calculateDiscount: getDiscount,
                updatePropertyType: updatePropertyTypeHandler,
                updatePropertySize: updatePropertySizeHandler,
                resetPropertyType: resetPropertyTypeHandler,
                resetPropertySize: resetPropertySizeHandler,
                getSquareFootageLevels: getSquareFootageLevelsHandler,
                initializeCalculatorVariables: initializeCalculatorVariablesHandler
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

//! BELOW IS A CONVENIENCE HELPER FUNCTION TO STREAMLINE THE USE OF THE CALCULATOR CONTEXT IN APPLICATION SUB COMPONENT CONSUMERS OF THE CONTEXT PROVIDER

export const useCalculator = () => useContext(CalculatorContext);

