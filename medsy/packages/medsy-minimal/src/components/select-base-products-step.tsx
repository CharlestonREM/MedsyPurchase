import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    LinearProgress,
    FormControl,
    FormHelperText,
    FormGroup,
    MenuItem,
    Stepper,
    Step,
    StepLabel,
    StepIcon,
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
                    <div key={index}>
                        <div style={{ display: 'flex' }}><Typography variant="body2" style={{ flexDirection: 'column' }}><span>{getServiceIcon(service)}</span>{getServiceData(service).name}</Typography> <Typography variant="body2" style={{ flexDirection: 'column' }}>Base Packages</Typography></div>
                        <AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} />
                    </div>
                );
            })}
            <FieldDataDisplay fieldName='basePackageCheckbox' color="violet" />
            <CalculatorContextDataDisplay color='greenyellow' />
        </>
    );
}

export default SelectBaseProductsStep;