import { Button, Chip, Typography } from '@material-ui/core'
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { CURRENCY } from 'helpers/constants';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
export interface CalculatorProps {

}

const Calculator: React.FC<CalculatorProps> = () => {
    const { clearCalculator, calculatePrice } = useCalculator();
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
        </>);
}

export default Calculator;