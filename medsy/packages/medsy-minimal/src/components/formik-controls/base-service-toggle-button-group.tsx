import { Box, Grid, Typography } from "@material-ui/core";
import { Field, useField } from "formik";
import { ToggleButtonGroup } from "formik-material-ui-lab";
import ToggleButton from '@material-ui/lab/ToggleButton';

import { useCalculator } from 'contexts/calculator/calculator.provider'

import ServiceToggleButton from "./service-toggle-button";

import _ from 'lodash';

export interface BaseServiceToggleButtonGroupProps {
    name: string;
    baseServices: object;
}

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
        console.log(buttonServiceId, buttonService, newValue);
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

    return (

        <Grid container justify="center">
            <Field component={ToggleButtonGroup} name={props.name} orientation="vertical" type="checkbox" onChange={(e: any) => {
                const buttonServiceId = e.target['offsetParent']['value'];

                const buttonService = props.baseServices[buttonServiceId];

                setFieldValue(baseServiceField.value, buttonServiceId)
            }} >
                <ToggleButton value="p" aria-label="photography" ><ServiceToggleButton value="p" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="v" aria-label="videography" ><ServiceToggleButton value="v" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="a" aria-label="aerial services" ><ServiceToggleButton value="a" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="d" aria-label="3d services" ><ServiceToggleButton value="d" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
            </Field>
        </Grid>

    );
}

export default BaseServiceToggleButtonGroup;