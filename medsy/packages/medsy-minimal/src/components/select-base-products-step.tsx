import {
    Grid,
    Typography
} from "@material-ui/core";
//imp FORMIK
import {
    useFormikContext,
    useField
} from "formik";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';
import { formikSelectionList } from "interfaces/form-values";

import AddBasePackageToggleButtonGroup from 'components/formik-controls/add-base-package-toggle-button-group'


import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";


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
                        <Grid container justify="center" >
                            <Typography style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto', color: '#999999' }}><span>{getServiceIcon(service)}</span><span>{getServiceData(service).name}</span><span style={{ color: 'black' }}>/Base Packages</span></Typography>
                        </Grid>
                        <Grid container>
                            <AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} />
                        </Grid>
                    </Grid>
                );
            })}
        </>
    );
}

export default SelectBaseProductsStep;