import React, { useContext } from 'react';
import { Button, Typography } from "@material-ui/core";
import { StepperContext } from 'contexts/stepper/stepper.provider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

//setup styles for grid
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navStepButton: {
            '& p': {
                fontSize: '1.1em',
                textTransform: 'capitalize',
                textDecoration: 'underline',
                fontWeight: 900
            }
        }
    })
);



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
    const classes = useStyles();
    return (<Button className={classes.navStepButton} onClick={() => {
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