import React, { useReducer, createContext } from 'react';
//import mui components need for figma wireframe
import { Button, Typography } from '@material-ui/core';

import { SelectionListProps } from 'interfaces/selections-list';
import SelectionsList from 'components/selections-list'
import ReviewInfo from 'components/review-info'

export interface ConfirmOrderProps extends SelectionListProps {

}

const ConfirmOrder: React.FC<ConfirmOrderProps> = (props) => {
    //setup props
    const { upgrades, products, upgradeField, basePackageField, ...rest } = props;
    // console.log('UPGRADES', upgrades)
    // console.log('PRODUCTS', products)
    return (
        <React.Fragment>
            <section>
                {/* //todo - CSS - put border botoom on header element */}
                <header>
                    <Typography variant="h6" align="center">Order Summary</Typography>
                    <Typography variant="body1" align="center">Please review your selections before placing your order</Typography>
                </header>
                {/* selections-list */}
                <SelectionsList upgrades={upgrades} products={products} upgradeField={upgradeField} basePackageField={basePackageField} />
                <div>
                    {/* //todo- CSS- fix vertical alignment of these two typogrpahy components */}
                    <Typography variant="h6" align="left">Total</Typography>
                    <Typography variant="h6" align="right">$600</Typography>
                </div>
            </section>
            {/* review info x 3 */}
            <ReviewInfo title="Profile" info={[{ fieldName: 'name', fieldValue: 'Joe Smith' }]} />
            <ReviewInfo title="Property" info={[{ fieldName: 'address', fieldValue: '1600 Somewhere Nice Lane' }]} />
            <ReviewInfo title="Session" info={[{ fieldName: 'preferred schedule date', fieldValue: '8/24/2020' }]} />
            <Button>Place Order</Button>
        </React.Fragment>
    );
}

export default ConfirmOrder;