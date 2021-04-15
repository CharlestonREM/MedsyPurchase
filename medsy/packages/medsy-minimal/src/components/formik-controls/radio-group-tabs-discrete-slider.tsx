import React, { useEffect, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Formik, { useFormikContext, useField } from 'formik';
import DiscreteSlider from "./discrete-slider";
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { useAvailableProducts } from 'contexts/available-products/available-products.provider';
import _ from 'lodash'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    optionImage: {
        width: '100%',
        marginTop: '1.5em',
        display: 'flex',
    },
    tab: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.3,
        '&.MuiTab-textColorInherit.Mui-selected': {
            color: 'black',
            backgroundColor: 'white',
            borderTop: 'blue solid .15em',
            borderColor: theme.palette.primary.main
        }
    },
    sliderContainer: {
        // backgroundColor: 'red',
    }
}));

//>mui simple tabs code
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <Grid
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            container
            className={classes.sliderContainer}
            {...other}
        >
            {value === index && (
                <Grid item xs={12}>
                    {children}
                </Grid>
            )}
        </Grid>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


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
    marks: Array<any>,
    min: number,
    max: number,
    name: string
}
//https://picsum.photos/360/200
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
    squareFootageLevels: any[]
}

const RadioGroupTabsDiscreteSlider: React.FC<RadioGroupTabsDiscreteSliderProps> = (props) => {
    // > tip from here for renaming destructured variables
    //> ---> https://wesbos.com/destructuring-renaming
    //const { values: formValues } = useFormikContext();
    const { label, name, options, squareFootageLevels, ...rest } = props;
    const [basePackageCheckboxField, basePackageCheckboxMeta, basePackageCheckboxHelpers] = useField('basePackageCheckbox');
    const [upgradeCheckboxField, upgradeCheckboxMeta, upgradeCheckboxHelpers] = useField('upgradeCheckbox');
    const { updatePropertyType } = useCalculator();
    const { availableBasePackages, availableUpgrades, removeNoLandProducts, returnNoLandProducts, allBasePackages, allUpgrades } = useAvailableProducts();
    const [propertyTypeField, propertyTypeMeta, propertyTypeHelpers] = useField(name);

    //>simpleTab example component methods
    const classes = useStyles();
    //>`usestate` is tracking the clicks and changes
    const [value, setValue] = useState(0);
    //info - handleChange handler


    const removeNoLandFromSelected = (field, setField, allList) => {
        console.log(field, setField)
        let newValue = [];
        //grab all products from ids in idArray
        _.forEach(field.value, (fieldName) => {
            console.log('i am the find:', _.find(allList, { 'id': fieldName }))
            newValue.push(_.find(allList, { 'id': fieldName }))
        })
        newValue = _.reject(newValue, { 'propertyType': 'no land' });
        //pull all field ids into new array
        newValue = _.map(newValue, 'id');
        setField(newValue)
        //remove all products returned that have the property type noland from the field
        //set the field value to this new array
    }



    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        // console.log('i am handle change for tabs...', propertyTypeField, event, newValue, options[newValue].value)

        //>The value is a numeric value of the index of the Tabs array, which is zero-indexed
        setValue(newValue);
        propertyTypeHelpers.setValue(options[newValue].value)
        updatePropertyType(options[newValue].value);
        //add business logic from fmui
        if (options[newValue].value === 'land') {
            //remove no land products from availabe products
            removeNoLandProducts({
                basePackageList: availableBasePackages,
                upgradeList: availableUpgrades
            })
            //removeNoLandProducts from currently selected basePackages
            removeNoLandFromSelected(basePackageCheckboxField, basePackageCheckboxHelpers.setValue, allBasePackages);
            //remove no land products from currently selected upgrades
            removeNoLandFromSelected(upgradeCheckboxField, upgradeCheckboxHelpers.setValue, allUpgrades);
        } else {
            returnNoLandProducts();
        }

    };

    //example in usage
    //  <RadioGroupTabsDiscreteSlider label={step1Radio.props.label} name={step1Radio.props.name} options={step1Radio.props.options} /> 

    return (

        < div className={classes.root} >

            {
                options.map((option, index) => {
                    return (
                        <TabPanel key={option.key} value={value} index={index}>
                            <img className={classes.optionImage} src={option.optionImageUrl} alt="" />
                        </TabPanel>
                    )
                })
            }

            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth" TabIndicatorProps={{
                style: {
                    display: "none"
                },
            }}>
                {
                    options.map((option, index) => {
                        return (
                            <Tab className={classes.tab} key={option.key} label={option.key} {...a11yProps(index)} />
                        )
                    })
                }
            </Tabs>
            {
                options.map((option, index) => {
                    return (
                        <TabPanel key={option.key} value={value} index={index}>
                            <DiscreteSlider discreteSlider={option.discreteSlider} squareFootageLevels={squareFootageLevels} />
                        </TabPanel>
                    )
                })
            }
        </div >
    );
}

export default RadioGroupTabsDiscreteSlider;