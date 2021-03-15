import React, { forwardRef, useRef, useImperativeHandle, useContext, useEffect } from 'react'
import { Box, Button, FormControlLabel, Grid, Link, Typography } from "@material-ui/core";
import { Field, ErrorMessage, useField } from "formik";
import { Switch } from 'formik-material-ui'

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";




import SelectionsList from 'components/selections-list';
import NavStepButton from "components/nav-step-button";
import ServiceLinkList from 'components/service-link-list';
import ServiceLinkButton from 'components/service-link-button'


import { StepperContext } from "contexts/stepper/stepper.provider";


import _ from 'lodash';

import { SelectionListProps } from 'interfaces/selections-list';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


//setup styles for grid
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        banner: {
            backgroundColor: theme.palette.secondary.main,
            padding: '1.75em',
            '& p': {
                fontSize: '1.25em',
                textTransform: 'capitalize',
                color: 'black',
                fontWeight: 900,
                textAlign: 'center'
            }
        },
        serviceLinkList: {
            padding: 0,
            margin: 0
        }
    })
);


//todo- check to see if i need to define props the same way in `ConfirmOrder` component
export interface ConfirmSelectionStepProps extends SelectionListProps {

}


const ConfirmSelectionStep: React.FC<ConfirmSelectionStepProps> = (props) => {

    //setup props
    const { upgrades, products, upgradeField, basePackageField, ...rest } = props;
    // console.log('UPGRADES', upgrades)
    // console.log('PRODUCTS', products)
    const confirmSelectionCheckbox = useField('confirmSelectionCheckbox');

    //console.log('useField confirmSelectionCheckbox', confirmSelectionCheckbox[1]);
    const classes = useStyles();


    return (<Box>
        <Grid container component="nav" justify="space-between">
            <Grid item xs={4} >
                <NavStepButton text="Add Products" action='GO_TO_BASE_SERVICE_SELECTION' />
            </Grid>
            <Grid item xs={4}>
                <Grid container justify="flex-end">
                    <NavStepButton text="Check Out" action='STEP_NEXT' payload={{ step: useContext(StepperContext).state.step }} disabled={confirmSelectionCheckbox[1].value === false} />
                </Grid>
            </Grid>
        </Grid>
        <SelectionsList upgrades={upgrades} products={products} upgradeField={upgradeField} basePackageField={basePackageField} />
        {/* <Box margin={1}>
            <FormControlLabel
                control={
                    <Field component={Switch} type="checkbox" name="confirmSelectionCheckbox" />
                }
                label="Looks good!"
            />
            <div><ErrorMessage name="confirmSelectionCheckbox" /></div>
        </Box> */}


        <ServiceLinkList />
    </Box>);
}

export default ConfirmSelectionStep;