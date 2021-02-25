import React from 'react';
import { Button, Chip, Typography } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
//custom helpers for services
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";
export interface ServiceToggleButtonProps {
    value: string;
    serviceImgSrc: string;
    serviceImgAlt: string;
    chipLabel: string;
}

const ServiceToggleButton: React.FC<ServiceToggleButtonProps> = (props) => {
    console.log(props)
    return (
        <React.Fragment>
            <figure>
                <img src={props.serviceImgSrc} alt={props.serviceImgAlt} />
                <figcaption>
                    {getServiceIcon(props.value)}
                    <Typography variant="h5">{getServiceData(props.value).name} </Typography>
                    <Chip label={props.chipLabel} color="primary" />
                </figcaption>
            </figure>
        </React.Fragment>
    );
}

export default ServiceToggleButton;