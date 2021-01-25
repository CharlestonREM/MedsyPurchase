import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
export interface CalculatorProps {

}

const Calculator: React.FC<CalculatorProps> = () => {
    return (<>
        <Chip color="primary" label="Clickable" icon={<ShoppingCartIcon />} />
    </>);
}

export default Calculator;