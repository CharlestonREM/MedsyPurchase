import React, { useEffect, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//attempt to use formik in component
import Formik, { useFormikContext, useField } from 'formik';


import DiscreteSlider from "./discrete-slider";
//>mui simple tabs code
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


export enum ValueLabelDisplayTypes {
    On = "on",
    Auto = "auto",
    Off = "off"
}

export interface discreteSlider {
    label: string,
    defaultValue: number,
    getAriaValueText: Function | string,
    ariaLabelledby: string,
    step: number,
    valueLabelDisplay?: string,
    // valueLabelDisplay?: ValueLabelDisplayTypes,
    marks: boolean | Array<any>,
    min: number,
    max: number
}
interface radioOptionProps {
    key: string,
    value: string,
    optionImageUrl: string,
    discreteSlider: discreteSlider,
}
export interface RadioGroupTabsDiscreteSliderProps {
    label: string,
    name: string,
    options: radioOptionProps[],
}

const RadioGroupTabsDiscreteSlider: React.FC<RadioGroupTabsDiscreteSliderProps> = (props) => {
    // > tip from here for renaming destructured variables
    //> ---> https://wesbos.com/destructuring-renaming
    //const { values: formValues } = useFormikContext();
    const { label, name, options, ...rest } = props;
    const [propertyTypeField, propertyTypeMeta, propertyTypeHelpers] = useField(name);
    //>simpleTab example component methods
    const classes = useStyles();
    //>`usestate` is tracking the clicks and changes
    const [value, setValue] = useState(0);
    //info - handleChange handler
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        // console.log('i am handle change for tabs...', propertyTypeField, event, newValue, options[newValue].value)

        //>The value is a numeric value of the index of the Tabs array, which is zero-indexed
        setValue(newValue);
        propertyTypeHelpers.setValue(options[newValue].value)
    };

    //example in usage
    //  <RadioGroupTabsDiscreteSlider label={step1Radio.props.label} name={step1Radio.props.name} options={step1Radio.props.options} /> 

    return (

        < div className={classes.root} >
            <figure>
                {
                    options.map((option, index) => {
                        return (
                            <TabPanel key={option.key} value={value} index={index}>
                                <img src={option.optionImageUrl} alt="" />
                            </TabPanel>
                        )
                    })
                }
            </figure>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                {
                    options.map((option, index) => {
                        return (
                            <Tab key={option.key} label={option.key} {...a11yProps(index)} />
                        )
                    })
                }
            </Tabs>
            {
                options.map((option, index) => {
                    return (
                        <TabPanel key={option.key} value={value} index={index}>
                            <DiscreteSlider discreteSlider={option.discreteSlider} />
                        </TabPanel>
                    )
                })
            }
        </div >
    );
}

export default RadioGroupTabsDiscreteSlider;