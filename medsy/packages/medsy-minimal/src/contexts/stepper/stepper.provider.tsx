//>CREATE STEPPER CONTEXT FOR PROVIDING STEP DATA AND FUNCTIONS
import React, { createContext, useMemo, useReducer } from 'react';
import { number } from 'yup/lib/locale';
// export const StepperContext = createContext<{
//     step?: number;
//     setStep?: Function;
// }>({});


export const GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE = 'GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE';
export const CALCULATION_STEP_REACHED = 'CALCULATION_STEP_REACHED';


export const StepperContext = createContext<{
    state?: any;
    dispatch?: React.Dispatch<any>;
}>({});

//define stepper initial state object configuration
const INITIAL_STATE = {
    step: 0,
    stepTitle: 'Tell us about your property',
    serviceSpecificBasePackage: null,
    calculationCanBegin: false
}

//define types of actions that will occur post-broadcast of the dispatch for stepper context
type ActionType =
    | { type: 'GO_TO_BASE_SERVICE_SELECTION'; payload: any }
    | { type: 'STEP_NEXT'; payload: any }
    | { type: 'STEP_BACK'; payload: any }
    | { type: 'GO_TO_SPECIFIC_STEP'; payload: any }
    | { type: 'GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE'; payload: any }
    | { type: 'CALCULATION_STEP_REACHED'; payload: any }
    | { type: 'SET_STEP_TITLE'; payload: any };

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
                step: parseInt(action.payload.step + 1),
                stepTitle: action.payload.stepTitle,
                serviceSpecificBasePackage: action.payload.serviceSpecificBasePackage
            };
        case 'STEP_BACK':
            return {
                ...state,
                step: parseInt(action.payload.step) - 1,
                stepTitle: action.payload.stepTitle,
                serviceSpecificBasePackage: action.payload.serviceSpecificBasePackage
            };
        case 'GO_TO_SPECIFIC_STEP':
            return {
                ...state,
                step: parseInt(action.payload.step)
            };
        case 'SET_STEP_TITLE':
            return {
                ...state,
                stepTitle: action.payload.stepTitle
            };
        case GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE:
            return {
                ...state,
                step: 2,
                serviceSpecificBasePackage: action.payload,
                stepTitle: 'Select your base packages'
            };
        case CALCULATION_STEP_REACHED:
            return {
                ...state,
                calculationCanBegin: true
            };
        default:
            return state;
    }
}

//info - useMemo; returns a memoized value. it's a react hook.

export const StepperProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    //console.log('i am stepper provider!')
    const context = useMemo(() => ({ state, dispatch }), [state.step]);
    return (
        <StepperContext.Provider value={context}>
            {children}
        </StepperContext.Provider>
    )
};