import React from 'react';
import { Box, Grid, Typography } from "@material-ui/core";
import { Field, useField } from "formik";
import { ToggleButtonGroup } from "formik-material-ui-lab";
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useCalculator } from 'contexts/calculator/calculator.provider'

import ServiceToggleButton from "./service-toggle-button";

import _ from 'lodash';

export interface BaseServiceToggleButtonGroupProps {
    name: string;
    baseServices: object;
}
const useStyles = makeStyles<Theme, BaseServiceToggleButtonGroupProps>(theme => ({
    root: {
        '& .MuiToggleButtonGroup-root': {
            // display: 'grid',
            // gridTemplateColumns: 'repeat(12, 1fr)',
            // flexDirection: 'column',
            width: '100%',

        },
    },
    toggleButton: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        margin: '2em 0',
        color: 'white',
        height: '100%',
        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '100%',
            // background: 'rgb(6,0,113)',
            background: 'linear-gradient(180deg, rgba(6,0,113,0) 0%, rgba(19,55,96,.65) 100%)',
            // background: 'blue',
            position: 'absolute',
            zIndex: 10000,
            top: 0,
            left: 0,
        },
        '&.Mui-selected': {
            '& .MuiSvgIcon-root': {
                color: 'white'
            },
            '& .MuiChip-root': {
                backgroundColor: '#72a047',
                color: 'white',
                '&::after': {
                    content: '"service added"',
                    visibility: 'visible',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize'

                },
                '& .MuiChip-label': {
                    display: 'none',
                },
            }
        }
    },

}));
const BaseServiceToggleButtonGroup: React.FC<BaseServiceToggleButtonGroupProps> = (props) => {
    const [baseServiceField, baseServiceMeta, baseServiceHelpers] = useField(props.name);
    const { setValue } = baseServiceHelpers;
    //get basePackage field too
    const [basePackageField, basePackageMeta, basePackageHelpers] = useField('basePackageCheckbox');

    const { addProduct, clearCalculator, getProduct, removeProduct, removeProductsOfServiceType } = useCalculator();

    const removeBasePackagesOfServiceType = (service) => {
        console.log('i am service', service);
        //filter through basePackageCheckbox array
        // let newBasePackageArray = [...basePackageField.value];
        const filteredBasePackages = _.filter(basePackageField.value, basePackageId => basePackageId.includes(service) !== true);
        console.log('i am filteredBasePackages', filteredBasePackages)
        basePackageHelpers.setValue(filteredBasePackages);
    }

    const setFieldValue = (currentValue, buttonServiceId) => {
        let newValue = [...currentValue];
        const buttonService = props.baseServices[buttonServiceId];
        // console.log(buttonServiceId, buttonService, newValue);
        //do this if the array is empty
        // if (newValue.length === 0) {
        //     clearCalculator();

        // }




        //info - on `includes` https://www.w3schools.com/jsref/jsref_includes_array.asp
        if (newValue.includes(buttonServiceId)) {
            //remove the item cuz it is already there
            newValue = newValue.filter(serviceId => serviceId !== buttonServiceId)
            setValue(newValue);
            //todo - if the newValue removed the serviceId after comparing oldvalue, then i need to remove all products of this type... i think the logic is too bulky nw and i need to check for all extant toggle buttons...
            // * compare currentValue and newValue
            // * `find` the difference between the two
            const serviceToRemove = _.xor(currentValue, newValue)[0];
            //now remove all items OF THIS SERVICE TYPE from the calculator AS WELL AS THE FIELD VALUE ARRAY
            removeProductsOfServiceType(buttonServiceId)
            //we also need to remove products of service type from the formik form's `basePackageCheckbox` field as well.
            removeBasePackagesOfServiceType(buttonServiceId);
        } else {
            //push the item cuz its not there yet
            newValue.push(buttonServiceId);
            setValue(newValue);
        }
    }

    //base-service-toggle-button-bkg-image
    //https://picsum.photos/700/460

    const classes = useStyles(props);
    return (

        <Grid container justify="center" className={classes.root}>
            <Field component={ToggleButtonGroup} name={props.name} orientation="vertical" type="checkbox" onChange={(e: any) => {
                console.log('on change fired')
                console.log(baseServiceField)

                const buttonServiceId = e.target['offsetParent']['offsetParent']['value'];
                console.log('buttonserviceid', buttonServiceId)

                const buttonService = props.baseServices[buttonServiceId];

                setFieldValue(baseServiceField.value, buttonServiceId)
                // baseServiceField.onChange(e);
            }} >
                <ToggleButton value="p" id="p-toggle" aria-label="photography" className={classes.toggleButton} style={{ backgroundImage: 'url("https://i.picsum.photos/id/1022/700/460.jpg?hmac=i08yfgv-ma1f3GEIsVWb749rp7y74g4wroCDMg-Mzn8")' }} ><ServiceToggleButton value="p" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="v" id="v-toggle" aria-label="videography" className={classes.toggleButton} style={{ backgroundImage: 'url("https://i.picsum.photos/id/59/700/460.jpg?hmac=pd_CXUS0n9l_crqo33Hb2A_RVZbMzDcDPF0sPHf9WWk")' }} ><ServiceToggleButton value="v" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="a" id="a-toggle" aria-label="aerial services" className={classes.toggleButton} style={{ backgroundImage: 'url("https://i.picsum.photos/id/572/700/460.jpg?hmac=SwjjfXzTXynJc-VkLOLCd80-7fGnuOKs9fptZVv3sh4")' }} ><ServiceToggleButton value="a" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="d" id="d-toggle" aria-label="3d services" className={classes.toggleButton} style={{ backgroundImage: 'url("https://i.picsum.photos/id/772/700/460.jpg?hmac=fbHIbZxQC1XZMNTjFWfUatIIWqUo7454sv2aVhyWU4U")' }} ><ServiceToggleButton value="d" chipLabel="Add Service" /></ToggleButton>
            </Field>
        </Grid >

    );
}

export default BaseServiceToggleButtonGroup;