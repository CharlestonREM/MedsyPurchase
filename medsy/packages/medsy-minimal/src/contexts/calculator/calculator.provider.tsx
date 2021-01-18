import React, { useReducer, createContext } from 'react';
//> `React.createContext` creates a Context object. when react renders a component that subscribes to this context object, it wil read the current context value from the closest matching Provider above it in the tree.
//info use React.createContext
export const CalculatorContext = createContext<{
    state?: any;
    dispatch?: React.Dispatch<any>;
}>({});

//todo fill in the `INITIAL_STATE` object
const INITIAL_STATE = {
};