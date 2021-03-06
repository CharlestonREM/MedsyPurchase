import React from 'react';
//import mui components need for figma wireframe
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { SelectionListProps } from 'interfaces/selections-list';
import SelectionsList from 'components/selections-list'
import ReviewInfo from 'components/review-info'

export interface ConfirmOrderProps extends SelectionListProps {

}

const ConfirmOrder: React.FC<ConfirmOrderProps> = (props) => {
    //setup props
    const { upgrades, products, upgradeField, basePackageField, ...rest } = props;
    //const profileInfo = useField('')
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
            <ReviewInfo title="Profile" infoGroupName="profile" infoStep={5} />
            <ReviewInfo title="Property" infoGroupName="property" infoStep={6} />
            <ReviewInfo title="Session" infoGroupName="session" infoStep={7} />
        </React.Fragment>
    );
}

export default ConfirmOrder;