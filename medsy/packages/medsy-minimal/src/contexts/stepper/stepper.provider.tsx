//>CREATE STEPPER CONTEXT FOR PROVIDING STEP DATA AND FUNCTIONS
import React, { createContext } from 'react';
export const StepperContext = createContext<{
    step?: number;
    setStep?: Function;
}>({});