import React from 'react';
import { Button, Typography } from "@material-ui/core";
export interface NavStepButtonProps {
    text: string;
    stepDestination: number;
}

const NavStepButton: React.SFC<NavStepButtonProps> = (props) => {
    const { text, stepDestination, ...rest } = props;
    return (<Button onClick={() => {
        console.log('i am navstepbutton stepDestination:', stepDestination)
    }} {...rest}>
        <Typography>{text}</Typography>
    </Button>);
}

export default NavStepButton;