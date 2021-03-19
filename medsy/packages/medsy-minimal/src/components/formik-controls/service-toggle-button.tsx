import React from 'react';
import { Button, Chip, Grid, Typography } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
//custom helpers for services
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface ServiceToggleButtonProps {
    value: string;
    chipLabel: string;
}
const useStyles = makeStyles<Theme, ServiceToggleButtonProps>(theme => ({
    container: {
        flexDirection: 'column',
        position: 'relative',
        zIndex: 20000
    },
    serviceName: {
        color: 'white',
        textTransform: 'capitalize',
        fontWeight: 500,
        fontSize: '1.75em'
    },
    chip: {
        textTransform: 'capitalize'
    },
    icon: {
        '& .MuiSvgIcon-root': {
            fontSize: '3.25em'
        }
    }
}));

const ServiceToggleButton: React.FC<ServiceToggleButtonProps> = (props) => {
    const classes = useStyles(props);
    return (
        <Grid container className={classes.container}>
            <Grid item className={classes.icon}>
                {getServiceIcon(props.value)}
            </Grid>
            <Grid item>
                <Typography className={classes.serviceName}>{getServiceData(props.value).name} </Typography>
            </Grid>
            <Grid item>
                <Chip className={classes.chip} label={props.chipLabel} color="primary" />
            </Grid>
        </Grid>
    );
}

export default ServiceToggleButton;