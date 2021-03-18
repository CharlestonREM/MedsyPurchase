import React from 'react';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Checkbox, Grid, Typography } from '@material-ui/core';

import _ from 'lodash';

//formik stuff
import { Field, ErrorMessage } from "formik";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';


import { useCalculator } from 'contexts/calculator/calculator.provider'
import { AddCircle, CheckCircle, Minimize } from '@material-ui/icons';
import MoreInfoAccordionButton from 'components/more-info-accordion-button';
import ThumbClipPath from 'components/thumb-clip-path';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             width: '100%',
//             '& .MuiButtonBase-root.MuiIconButton-root.MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd': {
//                 // display: 'contents',
//                 // alignItems: 'flex-end',
//                 // justifyContent: 'flex-end'
//                 // marginTop: '1em'
//                 '& .MuiIconButton-label': {
//                     flexDirection: 'column',
//                     '&::before': {
//                         //content string trick: https://stackoverflow.com/a/43361653/14657615
//                         // content: '"test"',
//                         content: props => props.basePackages,
//                         // display: 'block',
//                         // position: 'absolute',
//                     }
//                 }

//             }
//         },
//         summaryContainer: {
//             position: 'relative'
//         },
//         productNameWrap: {
//             position: 'absolute',

//         },
//         productName: {
//             fontWeight: 500
//         }
//     }),
// );

export interface StyleProps {
    label: string;
}
const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    root: {
        width: '100%',
        '& .MuiButtonBase-root.MuiIconButton-root.MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd': {
            // display: 'contents',
            // alignItems: 'flex-end',
            // justifyContent: 'flex-end'
            // marginTop: '1em'
            '& .MuiIconButton-label': {
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                flexWrap: 'wrap',
                flexDirection: 'column',
                flexFlow: 'column wrap',

            },
            '& .MuiIconButton-label::before': {
                color: 'yellow',
                gridColumn: '4 / span 5'
            }

        }
    },
    accordion: {
        color: 'red',

    },
    accordionSummary: {
        color: 'green',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        '& .MuiButtonBase-root.MuiIconButton-root.MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd': {
            gridColumnEnd: 'span 6',
            // padding: 0
        },
        '& .MuiAccordionSummary-content': {
            gridColumnEnd: 'span 6',
            justifyContent: 'flex-end'
        }
    },
    checkbox: {
        paddingRight: 0
    },
    summaryContainer: {
        // position: 'relative'
    },
    productNameWrap: {
        // position: 'absolute',

    },
    productName: {
        fontWeight: 500,
    }
}));



export interface BasePackageAccordionCheckboxGroupProps {
    basePackages: productInterface[];
    service: string;
    label: string;
    fieldName: string;
}

const BasePackageAccordionCheckboxGroup: React.FC<BasePackageAccordionCheckboxGroupProps> = (props) => {

    const classes = useStyles(props);
    const { basePackages, service, label, fieldName, ...rest } = props;
    const { addProduct, getProduct, removeProduct } = useCalculator();

    const updateCalculatorBasePackages = (event) => {
        //console.log('i am event', event.target.checked)
        const product = _.find(basePackages, { 'id': event.target['value'] });
        //console.log('i am product', product);
        if (event.target.checked) {
            addProduct(product)
        } else {
            removeProduct(product)
        }
    }


    const [expanded, setExpanded] = React.useState<string | false>(false);

    // const handleAccordionChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    //     console.log('i am panel', panel);
    //     console.log('i am event', event);
    //     //event.stopPropagation();
    //     console.log('isExpanded before set', isExpanded)
    //     setExpanded(isExpanded ? panel : false);
    //     console.log('isExpanded AFTER set', isExpanded)
    // };

    const handleAccordionChange = panel => (e) => {
        console.log('i am e', e)
        console.log('i am expanded', expanded)
        setExpanded(
            expanded !== panel ? panel : ""
        );
    };
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

                    return basePackages.map((basePackage, index) => {
                        const accIndex = ('panel' + index);
                        const css = `
                            .MuiButtonBase-root.MuiIconButton-root.MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd .MuiIconButton-label {
                               /* flex-direction:column;
                                align-items:flex-end;*/
                            }
                            .MuiPaper-root.MuiAccordion-root.MuiAccordion-rounded.MuiPaper-elevation1.MuiPaper-rounded:nth-child(${index + 1})  .MuiButtonBase-root.MuiIconButton-root.MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd .MuiIconButton-label::before  {
                                content: '${basePackage.productName}';
                                text-transform: capitalize;
                                font-size: .7em;
                                font-weight: 500;
                                color: black;
                                
                                text-align: right;
                                
                            }
                        `
                        if (basePackage.productService === service) {
                            return (
                                <Accordion expanded={expanded === accIndex} /* onChange={handleAccordionChange(accIndex)} */ className={classes.accordion} key={index} >
                                    <AccordionSummary
                                        // conditional expand icon: https://stackoverflow.com/a/63691313/14657615
                                        // based on controlled accordion example in mui docs: https://material-ui.com/components/accordion/#controlled-accordion
                                        expandIcon={expanded === accIndex ? <ExpandMoreIcon onClick={handleAccordionChange(accIndex)} /> : <MoreInfoAccordionButton onClick={handleAccordionChange(accIndex)} productName={basePackage.productName} />}
                                        aria-label="Expand"
                                        className={classes.accordionSummary}
                                        aria-controls={"additional-actions" + index + "-content"}
                                        id={"additional-actions" + index + "-header"}
                                        onClick={(e) => {
                                            // console.log('i am the accordionsummary onClick event', e);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <style>
                                            {css}
                                        </style>

                                        {/* <ThumbClipPath background={'no-repeat url("https://i.picsum.photos/id/222/536/354.jpg?hmac=0F40OROL8Yvsv14Vjrqvhs8J3BjAdEC8IetqdiSzdlU") center center'} backgroundSize="cover" /> */}

                                        {/* <Grid container className={classes.summaryContainer}>

                                            <Grid item xs={3} className={classes.productNameWrap}>
                                                <Typography className={classes.productName}>{basePackage.productName}</Typography>
                                            </Grid>
                                        </Grid> */}

                                        <Checkbox
                                            id={basePackage.id}
                                            className={classes.checkbox}
                                            {...field}
                                            icon={<AddCircle />} checkedIcon={<CheckCircle />}
                                            value={basePackage.id}
                                            checked={field.value.includes(basePackage.id)}
                                            color="primary"
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            onChange={(e) => {
                                                //todo - create on change function that ends in resetting the value of the input
                                                //use built in onchange handler and just pass the event!
                                                field.onChange(e);
                                                //update calculator context
                                                updateCalculatorBasePackages(e)
                                            }}
                                        />




                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography color="textSecondary" align="left">
                                                    This is an expanded product description for the selected basePackage service. It includes details about the service and basic pricing info.
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
                                                <h2>i was a mobile stepper</h2>
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

export default BasePackageAccordionCheckboxGroup;