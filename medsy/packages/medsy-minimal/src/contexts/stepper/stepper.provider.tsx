//>CREATE STEPPER CONTEXT FOR PROVIDING STEP DATA AND FUNCTIONS
import React, { createContext, useReducer } from 'react';
import { number } from 'yup/lib/locale';
// export const StepperContext = createContext<{
//     step?: number;
//     setStep?: Function;
// }>({});

export const StepperContext = createContext<{
    state?: any;
    dispatch?: React.Dispatch<any>;
}>({});

//define stepper initial state object configuration
const INITIAL_STATE = {
    step: 0
}

//define types of actions that will occur post-broadcast of the dispatch for stepper context
type ActionType =
    | { type: 'GO_TO_BASE_SERVICE_SELECTION'; payload: any }
    | { type: 'STEP_NEXT'; payload: any }
    | { type: 'STEP_BACK'; payload: any }
    | { type: 'GO_TO_SPECIFIC_STEP'; payload: any };

type StateType = typeof INITIAL_STATE;

function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case 'GO_TO_BASE_SERVICE_SELECTION':
            return {
                ...state,
                step: 1
            };
        case 'STEP_NEXT':
            return {
                ...state,
                step: parseInt(action.payload.step + 1)
            };
        case 'STEP_BACK':
            return {
                ...state,
                step: parseInt(action.payload.step) - 1
            };
        case 'GO_TO_SPECIFIC_STEP':
            return {
                ...state,
            };
        default:
            return state;
    }
}

export const StepperProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    console.log('i am stepper provider!')
    return (
        <StepperContext.Provider value={{ state, dispatch }}>
            {children}
        </StepperContext.Provider>
    )
};