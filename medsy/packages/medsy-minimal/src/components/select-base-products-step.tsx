import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from "@material-ui/core";
//imp FORMIK
import {
    Field,
    Form,
    Formik,
    useFormikContext,
    ErrorMessage,
    FormikConfig,
    FormikValues,
    useFormik,
    useField
} from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';
import { formikSelectionList } from "interfaces/form-values";

import CheckboxGroup from "components/formik-controls/checkbox-group";
import AddBasePackageToggleButtonGroup from 'components/formik-controls/add-base-package-toggle-button-group'

import FieldDataDisplay from 'components/data-displays/field-data-display'

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";
import CalculatorContextDataDisplay from "./data-displays/calculator-context-data-display";


export interface SelectBaseProductsStepProps {
    basePackages: productInterface[],
    baseServiceField: string;
}

const SelectBaseProductsStep: React.FC<SelectBaseProductsStepProps> = (props) => {
    const { basePackages, ...rest } = props;
    //type error fix: https://stackoverflow.com/a/55502664/14657615
    const formikContext = useFormikContext();
    const formValues: formikSelectionList = formikContext.values;
    const [baseServiceField, baseServiceMeta, baseServiceHelpers] = useField(props.baseServiceField);
    //console.log('i am formvalues.baseservicecheckbox', baseServiceField)

    return (
        <>
            {baseServiceField.value.map((service, index) => {
                let specificBasePackageProducts = [];
                let basePackageOptions = [];
                basePackages.map((product) => {
                    if (service === product.productService) {
                        specificBasePackageProducts.push(product);
                        let option = {
                            key: product.productName,
                            value: product.id,
                        };
                        basePackageOptions.push(option);
                    }
                });

                return (
                    <Grid container key={index}>
                        <Grid item xs={12}><Typography style={{ flexDirection: 'column', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto' }}><span>{getServiceIcon(service)}</span><span>{getServiceData(service).name}</span><span>/Base Packages</span></Typography></Grid>
                        <Grid item xs={12}><AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} /></Grid>
                    </Grid>
                );
            })}
            <FieldDataDisplay fieldName='basePackageCheckbox' color="violet" />
            <CalculatorContextDataDisplay color='greenyellow' />
        </>
    );
}

export default SelectBaseProductsStep;