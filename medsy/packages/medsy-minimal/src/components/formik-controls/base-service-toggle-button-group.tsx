import { Box, Grid, Typography } from "@material-ui/core";
import { Field } from "formik";
import { ToggleButtonGroup } from "formik-material-ui-lab";
import ToggleButton from '@material-ui/lab/ToggleButton';

import ServiceToggleButton from "./service-toggle-button";

export interface BaseServiceToggleButtonGroupProps {
    name: string;
}

const BaseServiceToggleButtonGroup: React.FC<BaseServiceToggleButtonGroupProps> = (props) => {
    return (
        <Grid container spacing={4}>
            <Typography>Toggle button</Typography>
            <Field component={ToggleButtonGroup} name={props.name} type="checkbox">
                <ToggleButton value="p" aria-label="photography" ><ServiceToggleButton value="p" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="v" aria-label="videography" ><ServiceToggleButton value="v" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="a" aria-label="aerial services" ><ServiceToggleButton value="a" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
                <ToggleButton value="d" aria-label="3d services" ><ServiceToggleButton value="d" serviceImgSrc="https://picsum.photos/250/75" serviceImgAlt="https://picsum.photos" chipLabel="Add Service" /></ToggleButton>
            </Field>
        </Grid>
    );
}

export default BaseServiceToggleButtonGroup;