//necessary imports
import React, { useReducer, useContext, createContext } from 'react';

//> the reducer is based on the calculator.reducer as a boilerplate
import { reducer, calculatorProductsTotalPrice } from './calculator.reducer';

//> medsybp (medsy boilerplate) created helper functions using  localForage, a storage library for javascript
//info https://github.com/localForage/localForage
import { useStorage } from 'helpers/use-storage';

//info `React.createContext` creates a Context object. when react renders a component that subscribes to this context object, it wil read the current context value from the closest matching Provider above it in the tree.
//info use React.createContext
//> use an empty object because dispatches are going to be defined in `useCalculatorActions` which returns a configuration object of key,value pairs for defining helper methods via various specified handlers
// * use createContext to create the initial context object for the provider
export const CalculatorContext = createContext({} as any);

//! INITIAL STATE DEFINED BELOW
const INITIAL_STATE = {
    propertyType: '',
    //defaults to `Lvl` square foot range of 0, which if propertyType is house, corresponds to under 2000 sq ft and thus has a zero value for the adjustment multiplier
    propertySize: 0,
    products: [],
    //TODO - consider initialValue being an empty array, instead of null because we can have multiple conditions but medsybp limited the application of only one discountCondition at a time
    discountCondition: null,
};


//! DEFINE DISPATCH HANDLER ACTIONS FROM REDUCER FUNCTION BELOW
const useCalculatorActions = (initialCalculator = INITIAL_STATE) => {
    const [state, dispatch] = useReducer(reducer, initialCalculator);

    const addProductHandler = (product, quantity = 1) => {
        dispatch({ type: 'ADD_PRODUCT', payload: { ...product, quantity } });
    };

    const removeProductHandler = (product, quantity = 1) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: { ...product, quantity } });
    };

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
    const isInCalculatorHandler = (id) => {
        return state.products?.some((product) => product.id === id);
    };
    const getProductHandler = (id) => {
        return state.products?.find((product) => product.id === id);
    };
    const getCalculatorProductsPrice = () => calculatorProductsTotalPrice(state.products).toFixed(2);
    const getCalculatorProductsTotalPrice = () =>
        calculatorProductsTotalPrice(state.products, state.discountCondition).toFixed(2);

    const getDiscount = () => {
        const total = calculatorProductsTotalPrice(state.products);
        const discount = state.discountCondition
            ? (total * Number(state.discountCondition?.discountInPercent)) / 100
            : 0;
        return discount.toFixed(2);
    };
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
    } = useCalculatorActions();
    const { rehydrated, error } = useStorage(state, rehydrateLocalState);

    return (
        <CalculatorContext.Provider
            value={{
                isOpen: state.isOpen,
                products: state.products,
                discountCondition: state.discountCondition,
                calculatorProductsCount: state.products?.length,
                productsCount: getProductsCount,
                addProduct: addProductHandler,
                removeProduct: removeProductHandler,
                removeProductFromCalculator: clearProductFromCalculatorHandler,
                clearCalculator: clearCalculatorHandler,
                isInCalculator: isInCalculatorHandler,
                getProduct: getProductHandler,
                toggleCalculator: toggleCalculatorHandler,
                calculatePrice: getCalculatorProductsTotalPrice,
                calculateSubTotalPrice: getCalculatorProductsPrice,
                applyDiscountCondition: discountConditionHandler,
                removeDiscountCondition: removeDiscountConditionHandler,
                calculateDiscount: getDiscount,
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

//! BELOW IS A CONVENIENCE HELPER FUNCTION TO STREAMLINE THE USE OF THE CALCULATOR CONTEXT IN APPLICATION SUB COMPONENT CONSUMERS OF THE CONTEXT PROVIDER

export const useCalculator = () => useContext(CalculatorContext);

