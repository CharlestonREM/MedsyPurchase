import { Box, Grid, Typography } from "@material-ui/core";
import { Field } from "formik";
import { ToggleButtonGroup } from "formik-material-ui-lab";
import ToggleButton from '@material-ui/lab/ToggleButton';
import { product as productInterface } from 'interfaces/google-spreadsheet-data';

import AddBasePackageToggleButton from "./add-base-package-toggle-button";
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";

export interface AddBasePackageToggleButtonGroupProps {
    name: string;
    service: string;
    serviceProducts: productInterface[],
}

const AddBasePackageToggleButtonGroup: React.FC<AddBasePackageToggleButtonGroupProps> = (props) => {
    const handleChange = () => {
        console.log('i changed')
    }
    return (
        <Grid container spacing={4}>
            <Typography>Add base package Toggle button</Typography>
            {/* //todo make orientation vertical of togglebuttongroup */}
            {/* //todo figure out onChange functionality for Field ToggleButtonGroup */}
            <Field component={ToggleButtonGroup} name={props.name} type="checkbox"  >
                {
                    props.serviceProducts.map((product, index) => {
                        return <ToggleButton key={index} value={product.id} aria-label={getServiceData(product.productService).name} ><AddBasePackageToggleButton service={product.productService} serviceProduct={product} serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                    })
                }
            </Field>
        </Grid>
    );
}

export default AddBasePackageToggleButtonGroup;