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

//formik stuff
import { Field, ErrorMessage } from "formik";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';

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

const UpgradeAccordionCheckboxGroup: React.FC<UpgradeAccordionCheckboxGroupProps> = (props) => {
    const classes = useStyles();
    const { upgrades, service, label, fieldName, ...rest } = props;
    console.log(upgrades)

    return (
        <div className={classes.root}>
            <Field
                name={fieldName}
                onChange={() => {
                    console.log("change handled");
                }}
                {...rest}
            >
                {({ field }) => {

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
                                                <Typography variant='h6' color='primary'>{upgrade.productName}</Typography>
                                                <Typography variant='body2' >{upgrade.description}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Checkbox
                                                    id={upgrade.id}
                                                    {...field}
                                                    value={upgrade.id}
                                                    color="primary"
                                                    onClick={(event) => event.stopPropagation()}
                                                    onFocus={(event) => event.stopPropagation()}
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



                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            The click event of the nested action will propagate up and expand the accordion unless
                                            you explicitly stop it.
                  </Typography>
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