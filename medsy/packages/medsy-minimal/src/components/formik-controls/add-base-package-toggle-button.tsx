import React from 'react';
import { Button, Chip, Grid, Typography } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
//custom helpers for services
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';


export interface AddBasePackageToggleButtonProps {
    service: string;
    serviceProduct: productInterface,
}

const AddBasePackageToggleButton: React.FC<AddBasePackageToggleButtonProps> = (props) => {
    //console.log(props)
    return (
        <React.Fragment>
            <Grid container>
                <Grid xs={7} item>
                    <figure>
                        <img src={props.serviceImgSrc} alt={props.serviceImgAlt} />
                        <figcaption>
                            +
                        </figcaption>
                    </figure>
                </Grid>
                <Grid xs={4} item>
                    <Typography variant="h6">{props.serviceProduct.productName} </Typography>
                    {/* //todo - figure out how to do nested button functionality in toggle group or else js loop and render brother descendants instead of children */}
                    More Info
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddBasePackageToggleButton;