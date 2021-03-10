import { Box, Typography } from '@material-ui/core';
import { useAvailableProducts } from 'contexts/available-products/available-products.provider'

export interface AvailableProductsContextDataDisplayProps {
    color: string;
}

const AvailableProductsContextDataDisplay: React.FC<AvailableProductsContextDataDisplayProps> = (props) => {
    const context = useAvailableProducts();
    // console.log('i am context in data display for available products', context)

    return (

        <Box bgcolor={props.color}>
            <Typography variant="h6">AvailableProducts Context Data Display</Typography>
            <pre><strong>availableBasePackages: </strong>{JSON.stringify(context.availableBasePackages, null, 2)}</pre>
            <pre><strong>availableUpgrades: </strong>{JSON.stringify(context.availableUpgrades, null, 2)}</pre>
            <pre><h2>allBasePackages: </h2>{JSON.stringify(context.allBasePackages, null, 2)}</pre>
            <pre><h2>allUpgrades: </h2>{JSON.stringify(context.allUpgrades, null, 2)}</pre>

        </Box>
    );
}

export default AvailableProductsContextDataDisplay;