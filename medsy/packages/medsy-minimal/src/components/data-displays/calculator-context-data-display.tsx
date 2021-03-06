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
            <pre><strong>propertyType: </strong>{JSON.stringify(context.propertyType, null, 2)}</pre>
            <pre><strong>propertySize: </strong>{JSON.stringify(context.propertySize, null, 2)}</pre>
            <pre><strong>products: </strong>{JSON.stringify(context.products, null, 2)}</pre>
            <pre><strong>squareFootageLevels: </strong>{JSON.stringify(context.squareFootageLevels, null, 2)}</pre>
            <pre><strong>licenseOptions: </strong>{JSON.stringify(context.licenseOptions, null, 2)}</pre>
        </Box>
    );
}

export default CalculatorContextDataDisplay;