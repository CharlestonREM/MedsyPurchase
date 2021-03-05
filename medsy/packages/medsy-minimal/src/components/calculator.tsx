import React from 'react'
import { Button, Chip, Typography } from '@material-ui/core'
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { CURRENCY } from 'helpers/constants';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
export interface CalculatorProps {
    licenseOptions: any[];
    useIsMounted: Function;
}

const Calculator: React.FC<CalculatorProps> = (props) => {
    const { clearCalculator, calculatePrice, resetPropertySize, resetPropertyType, initializeCalculatorVariables } = useCalculator();
    console.log('i am isMounted', props.useIsMounted)
    const isMounted = props.useIsMounted();
    const licenseOptions = React.useMemo(() => (
        isMounted ? initializeCalculatorVariables(props.licenseOptions) : undefined
    ),
        [isMounted, props.licenseOptions]);

    return (
        <>
            <Chip color="primary" label="Clickable" icon={<ShoppingCartIcon />} />
            <Typography variant="h2">
                total:  {CURRENCY}
                {calculatePrice()}
            </Typography>
            <Button variant="contained" onClick={() => {
                clearCalculator();
            }}>Clear Calculator</Button>


            <Button variant="contained" onClick={() => {
                resetPropertyType();
            }}>Reset property type</Button>


            <Button variant="contained" onClick={() => {
                resetPropertySize();
            }}>reset property size</Button>
        </>);
}

export default Calculator;