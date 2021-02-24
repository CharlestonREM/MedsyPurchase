import React, { useReducer, createContext } from 'react';
export const ModalContext = createContext<{
    state?: any;
    dispatch?: React.Dispatch<any>;
}>({});

const INITIAL_STATE = {
    isModalOpen: false,
    modalContent: ''
};

type ActionType =
    | { type: 'OPEN_MODAL'; payload: any }
    | { type: 'CLOSE_MODAL'; payload: any }
    | { type: 'START_OVER'; payload: any }
    | { type: 'NO_VALUE'; payload: any };

type StateType = typeof INITIAL_STATE;

const startOver = (removeUpgrades, setFieldValue, newValue, setStep, step) => {
    removeUpgrades();
    setFieldValue(newValue);
    setStep(step);
}

function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: true,
                modalContent: 'Are you sure you want to remove the last product? You can restart the process of picking  a product.',
                stepperAction: action.payload.stepperAction,
                removeUpgrades: action.payload.removeUpgrades,
                setFieldValue: action.payload.setFieldValue,
                newValue: action.payload.newValue,
            };
        case 'NO_VALUE':
            return {
                ...state,
                isModalOpen: true,
                modalContent: 'please enter value',
            };
        case 'START_OVER':
            return {
                ...state,
                isModalOpen: true,
                modalContent: 'START OVER',
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false,
            };
        default:
            return state;
    }
}

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    // console.log('modalProvider state', state)
    // console.log('modalProvider dispatch', dispatch)
    return (
        <ModalContext.Provider value={{ state, dispatch }}>
            {children}
        </ModalContext.Provider>
    )
};
