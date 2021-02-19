import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { Box, Button, FormControlLabel, Link, Typography } from "@material-ui/core";

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";


import SelectionsList from 'components/selections-list';

import SimpleModal from 'components/modal'

import _ from 'lodash';


export interface ConfirmSelectionStepProps {
    upgrades: [];
    products: [];
    upgradeField: string;
    basePackageField: string;
}


const ConfirmSelectionStep: React.FC<ConfirmSelectionStepProps> = (props) => {
    //modal helpers
    const modalRef = useRef();
    //setup props
    const { upgrades, products, upgradeField, basePackageField, ...rest } = props;
    console.log('UPGRADES', upgrades)
    console.log('PRODUCTS', products)


    return (<Box>
        <Link
            component="button"
            variant="body2"
            onClick={() => {

            }}
        >
            Add Products
        </Link>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
                console.info("begin navigating to base service selection step using setStep variant on stepper component");
            }}
        >
            Checkout
        </Link>
        {/* <Box bgcolor="#f08080">
            <Typography>Formik Form and Data Values</Typography>
            <pre><strong>selectedServices = </strong>{JSON.stringify(selectedServices, null, 2)}</pre>
            <pre><strong>selectedProducts = </strong>{JSON.stringify(selectedProducts, null, 2)}</pre>
            <pre><strong>selectedUpgrades = </strong>{JSON.stringify(selectedUpgrades, null, 2)}</pre>
        </Box> */}

        <SelectionsList upgrades={upgrades} products={products} upgradeField={upgradeField} basePackageField={basePackageField} />

        <aside>
            <div className="banner">
                Need More? Add Services Now!
            </div>
            <ul>
                {
                    Object.values(serviceData).map((value, i) => {
                        if (value.baseService === true) {
                            return <li key={i}><figure>
                                <figcaption>{getServiceIcon(value.value)} <Link>{value.name}</Link></figcaption></figure></li>
                        }
                    })
                }
            </ul>
        </aside>
        {/* <SimpleModal ref={modalRef} startOver={() => {
            removeAllUpgrades();
            basePackageHelpers.setValue(newValue);

        }} /> */}
    </Box>);
}

export default ConfirmSelectionStep;