import React from 'react'
import { Button, Chip, Grid, Typography } from '@material-ui/core'
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { CURRENCY } from 'helpers/constants';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
export interface CalculatorProps {
}

const Calculator: React.FC<CalculatorProps> = (props) => {
    const { clearCalculator, calculatePrice, resetPropertySize, resetPropertyType } = useCalculator();


    return (
        <>
            <Grid container justify="flex-end" className="calculator-container">
                <Grid item>
                    <Chip color="primary" label={CURRENCY + calculatePrice()} icon={<ShoppingCartIcon />} />
                </Grid>
            </Grid>
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