import React, { forwardRef, useRef, useImperativeHandle, useContext, useEffect } from 'react'
import { Box, Button, FormControlLabel, Link, Typography } from "@material-ui/core";
import { Field, ErrorMessage, useField } from "formik";
import { Switch } from 'formik-material-ui'

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";




import SelectionsList from 'components/selections-list';
import SimpleModal from 'containers/modal/modal'
import NavStepButton from "components/nav-step-button";

import { StepperContext } from "contexts/stepper/stepper.provider";


import _ from 'lodash';

import { SelectionListProps } from 'interfaces/selections-list';

//todo- check to see if i need to define props the same way in `ConfirmOrder` component
export interface ConfirmSelectionStepProps extends SelectionListProps {

}


const ConfirmSelectionStep: React.FC<ConfirmSelectionStepProps> = (props) => {

    //setup props
    const { upgrades, products, upgradeField, basePackageField, ...rest } = props;
    // console.log('UPGRADES', upgrades)
    // console.log('PRODUCTS', products)
    const confirmSelectionCheckbox = useField('confirmSelectionCheckbox');

    console.log('useField confirmSelectionCheckbox', confirmSelectionCheckbox[1]);


    return (<Box>
        <nav>
            <NavStepButton text="Add Products" action='GO_TO_BASE_SERVICE_SELECTION' />
            <NavStepButton text="Check Out" action='STEP_NEXT' payload={{ step: useContext(StepperContext).state.step }} disabled={confirmSelectionCheckbox[1].value === false} />
        </nav>
        <SelectionsList upgrades={upgrades} products={products} upgradeField={upgradeField} basePackageField={basePackageField} />
        <Box margin={1}>
            <FormControlLabel
                control={
                    <Field component={Switch} type="checkbox" name="confirmSelectionCheckbox" />
                }
                label="Looks good!"
            />
            <div><ErrorMessage name="confirmSelectionCheckbox" /></div>
        </Box>

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
        <SimpleModal />
    </Box>);
}

export default ConfirmSelectionStep;