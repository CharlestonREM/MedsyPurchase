import React, { useContext } from 'react';
import { Button, Typography } from "@material-ui/core";
import { StepperContext } from 'contexts/stepper/stepper.provider';



export interface NavStepButtonProps {
    text: string;
    action: string;
    payload?: object;
    disabled?: boolean;
}

const NavStepButton: React.FC<NavStepButtonProps> = (props) => {
    const { dispatch: dispatchStepper } = useContext(StepperContext);
    const { text, action, disabled, ...rest } = props;
    let { payload } = props;
    return (<Button onClick={() => {
        if (payload === undefined) {
            payload = {}
        }



        dispatchStepper({ type: action, payload: payload })
        console.log('i am navstepbutton props:', action, payload);
    }} {...rest} disabled={disabled}>
        <Typography>{text}</Typography>
    </Button>);
}

export default NavStepButton;