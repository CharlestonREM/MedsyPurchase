import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';

import _ from 'lodash';

//formik stuff
import { Field, ErrorMessage } from "formik";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';
import SwipeableTextMobileStepper from 'components/swipable-text-mobile-stepper';

import { useCalculator } from 'contexts/calculator/calculator.provider'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});


export interface UpgradeAccordionCheckboxGroupProps {
    upgrades: productInterface[];
    service: string;
    label: string;
    fieldName: string;
}

//todo- potential bottleneck performance concerns for accordion: https://material-ui.com/components/accordion/#performance

const UpgradeAccordionCheckboxGroup: React.FC<UpgradeAccordionCheckboxGroupProps> = (props) => {
    const classes = useStyles();
    const { upgrades, service, label, fieldName, ...rest } = props;
    const { addProduct, getProduct, removeProduct } = useCalculator();
    //console.log(upgrades)

    const updateCalculatorUpgrades = (event) => {
        //console.log('i am event', event.target.checked)
        const product = _.find(upgrades, { 'id': event.target['value'] });
        //console.log('i am product', product);
        if (event.target.checked) {
            addProduct(product)
        } else {
            removeProduct(product)
        }
    }

    return (
        <div className={classes.root}>
            <Field
                name={fieldName}
                onChange={(e) => {
                    console.log("change handled!"), e;
                }}
                {...rest}
            >
                {({ field, handleChange }) => {
                    // console.log('i am field', field)

                    return upgrades.map((upgrade, index) => {
                        if (upgrade.productService === service) {
                            return (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >
                                        <Grid container>
                                            <Grid item xs={9}>
                                                <Typography variant='h6' color='primary' align="left">{upgrade.productName}</Typography>
                                                <Typography variant='body2' align="left">{upgrade.description}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Checkbox
                                                    id={upgrade.id}
                                                    {...field}
                                                    value={upgrade.id}
                                                    color="primary"
                                                    onClick={(event) => event.stopPropagation()}
                                                    onFocus={(event) => event.stopPropagation()}
                                                    onChange={(e) => {
                                                        //todo - create on change function that ends in resetting the value of the input
                                                        //use built in onchange handler and just pass the event!
                                                        field.onChange(e);
                                                        //update calculator context
                                                        updateCalculatorUpgrades(e)
                                                    }}
                                                />
                                                {/* <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<Checkbox />}
                                                label="I acknowledge that I should stop the click event propagation"
                                            /> */}
                                            </Grid>
                                        </Grid>

                                        {/* test push to vercel */}

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography color="textSecondary" align="left">
                                                    This is an expanded product description for the selected upgrade service. It includes details about the service and basic pricing info.
                                    </Typography>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <ul>
                                                    <li>
                                                        <Typography color="textSecondary" align="left">
                                                            Some important fact
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography color="textSecondary" align="left">
                                                            Another important detail
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography color="textSecondary" align="left">
                                                            The key selling point
                                                        </Typography>
                                                    </li>
                                                </ul>
                                            </Grid>
                                            <Grid item xs={6}>
                                                More Details Online
                                            </Grid>
                                            <Grid item xs={6}>
                                                icons go here
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SwipeableTextMobileStepper />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        }

                    })

                }}
            </Field>
        </div>
    );
}

export default UpgradeAccordionCheckboxGroup;