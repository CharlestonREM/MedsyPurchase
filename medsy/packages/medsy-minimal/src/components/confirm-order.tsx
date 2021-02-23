import React, { useReducer, createContext } from 'react';
//import mui components need for figma wireframe
import { Typography } from '@material-ui/core';

import { SelectionListProps } from 'interfaces/selections-list';
import SelectionsList from 'components/selections-list'

export interface ConfirmOrderProps extends SelectionListProps {

}

const ConfirmOrder: React.FC<ConfirmOrderProps> = (props) => {
    //setup props
    const { upgrades, products, upgradeField, basePackageField, ...rest } = props;
    // console.log('UPGRADES', upgrades)
    // console.log('PRODUCTS', products)
    return (
        <React.Fragment>
            {/* //todo - CSS - put border botoom on header element */}
            <header>
                <Typography variant="h6" align="center">Order Summary</Typography>
                <Typography variant="body1" align="center">Please review your selections before placing your order</Typography>
            </header>
            {/* selections-list */}
            <SelectionsList upgrades={upgrades} products={products} upgradeField={upgradeField} basePackageField={basePackageField} />
        </React.Fragment>
    );
}

export default ConfirmOrder;