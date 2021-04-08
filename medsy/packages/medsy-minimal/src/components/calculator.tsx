import React, { useEffect } from 'react'
import { Button, Chip, Grid, Typography } from '@material-ui/core'
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { useAvailableProducts } from 'contexts/available-products/available-products.provider';
import { CURRENCY } from 'helpers/constants';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            '& .MuiChip-icon': {
                height: '100%',
                borderRight: 'solid 1px white',
                borderRightColor: theme.palette.secondary.main
            },
            '& .MuiChip-label': {
                fontSize: '1.5em'
            }
        },
    }),
);


import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useIsMounted = () => {
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    return isMounted
}
export interface CalculatorProps {
    basePackageList: any[];
    upgradeList: any[];
    squareFootage: any[];
    licenseOptions: any[];
}

const Calculator: React.FC<CalculatorProps> = (props) => {
    const classes = useStyles();
    const { licenseOptions, squareFootage, basePackageList, upgradeList } = props;
    const { clearCalculator, calculatePrice, resetPropertySize, resetPropertyType } = useCalculator();
    const { initializeCalculatorVariables } = useCalculator();
    const { initializeAvailableProductsState, availableBasePackages, availableUpgrades } = useAvailableProducts();



    // const isMounted = useIsMounted()
    // const lOptions = React.useMemo(() => (
    //     isMounted ? () => initializeCalculatorVariables(licenseOptions, squareFootage) : undefined
    // ),
    //     [isMounted, licenseOptions])
    // let avP = React.useMemo(() => {
    //     isMounted ? () => initializeAvailableProductsState(basePackageList, upgradeList) : undefined
    // }, [isMounted, basePackageList, upgradeList])

    useEffect(() => {
        // console.log('i am use effect')
        let canceled = false;
        if (!canceled) {
            // console.log('i am the execution block `if not canceled`');
            initializeCalculatorVariables(licenseOptions, squareFootage);
            initializeAvailableProductsState(basePackageList, upgradeList);
        }

        return () => {
            canceled = true;
        }

    }, [licenseOptions, squareFootage])



    return (
        <>
            <Grid container justify="flex-end" className="calculator-container">
                <Grid item>
                    <Chip className={classes.chip} color="primary" label={CURRENCY + calculatePrice()} icon={<ShoppingCartIcon />} />
                </Grid>
            </Grid>
            {/* <Typography variant="h2">
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
            }}>reset property size</Button> */}
        </>);
}

export default Calculator;