import { Box, Typography } from '@material-ui/core';
import { useCalculator } from 'contexts/calculator/calculator.provider'

export interface CalculatorContextDataDisplayProps {
    color: string;
}

const CalculatorContextDataDisplay: React.FC<CalculatorContextDataDisplayProps> = (props) => {
    const context = useCalculator();
    return (

        <Box bgcolor={props.color}>
            <Typography variant="h6">Calculator Context Data Display</Typography>
            <pre>{JSON.stringify(context.products, null, 2)}</pre>
        </Box>
    );
}

export default CalculatorContextDataDisplay;