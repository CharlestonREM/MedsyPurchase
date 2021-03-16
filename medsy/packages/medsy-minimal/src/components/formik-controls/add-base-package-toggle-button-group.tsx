import { Box, Grid, Typography } from "@material-ui/core";
import { Field } from "formik";
import { ToggleButtonGroup } from "formik-material-ui-lab";
import ToggleButton from '@material-ui/lab/ToggleButton';
import { product as productInterface } from 'interfaces/google-spreadsheet-data';

import AddBasePackageToggleButton from "./add-base-package-toggle-button";
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";
import { useField } from 'formik'

import { useCalculator } from 'contexts/calculator/calculator.provider'
import _ from "lodash";

export interface AddBasePackageToggleButtonGroupProps {
    name: string;
    service: string;
    serviceProducts: productInterface[],
}



const AddBasePackageToggleButtonGroup: React.FC<AddBasePackageToggleButtonGroupProps> = (props) => {
    const [basePackageField, basePackageMeta, basePackageHelpers] = useField(props.name);

    //used to add service to an array based on a product added from service selection link
    const [baseServiceField, baseServiceMeta, baseServiceHelpers] = useField('baseServiceCheckbox');


    const { setValue } = basePackageHelpers;
    const { addProduct, getProduct, removeProduct } = useCalculator();

    const addToCalculator = (product) => {
        addProduct(product);
    }
    const handleChange = (product) => {
        console.log('i am the product in handlechange', product)
        addToCalculator(product)
    }

    const setFieldValue = (currentValue, buttonProductId) => {
        let newValue = [...currentValue];
        let newBaseServiceValue = [...baseServiceField.value];
        const buttonProduct = props.serviceProducts?.find((product) => product.id === buttonProductId);
        //> add the service as well
        const service = buttonProduct.productService;
        //info - on `includes` https://www.w3schools.com/jsref/jsref_includes_array.asp
        if (newValue.includes(buttonProductId)) {
            //remove the item cuz it is already there
            newValue = newValue.filter(productId => productId !== buttonProductId)
            setValue(newValue);
            //now remove the item from the calculator AS WELL AS THE FIELD VALUE ARRAY
            removeProduct(buttonProduct)
        } else {
            //push the item cuz its not there yet
            newValue.push(buttonProductId);
            setValue(newValue);
            //now add the item to the calculator
            addProduct(buttonProduct)
        }

        //do conditional check on baseServiceCheckbox
        // const serviceIsAlreadyInArray = (_.filter(newBaseServiceValue, function (string) { return string === service })).length === 0;
        const serviceIsAlreadyInArray = _.includes(newBaseServiceValue, service);

        console.log('i am serviceIsAlreadyInArray', serviceIsAlreadyInArray)
        console.log(baseServiceField);
        if (!serviceIsAlreadyInArray) {
            newBaseServiceValue.push(service);
            baseServiceHelpers.setValue(newBaseServiceValue)
        } else {
            //it is in the array so remove it
            console.log('in the else statement', newBaseServiceValue);
            // baseServiceHelpers.setValue(_.reject(newBaseServiceValue, function (string) { return string === service }))
        }

    }




    return (
        <Grid container>

            {/* //todo make orientation vertical of togglebuttongroup */}
            {/* //todo figure out onChange functionality for Field ToggleButtonGroup */}
            <Field component={ToggleButtonGroup} name={props.name} orientation="vertical" style={{ width: '100%' }} type="checkbox" onChange={(e: any) => {
                const buttonProductId = e.target['offsetParent']['value'];
                const buttonProduct = props.serviceProducts?.find((product) => product.id === buttonProductId);
                setFieldValue(basePackageField.value, buttonProductId)
            }} >
                {
                    props.serviceProducts.map((product, index) => {
                        return <ToggleButton key={index} value={product.id} aria-label={getServiceData(product.productService).name} ><AddBasePackageToggleButton service={product.productService} serviceProduct={product} serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" /></ToggleButton>
                    })
                }
            </Field>
        </Grid>
    );
}

export default AddBasePackageToggleButtonGroup;