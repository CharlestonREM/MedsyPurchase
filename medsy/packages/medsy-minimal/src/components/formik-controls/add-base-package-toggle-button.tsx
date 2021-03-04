import React from 'react';
import { Button, Chip, Grid, Typography } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
//custom helpers for services
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        max: {
            maxWidth: '450px',
            margin: 'auto'
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        stepperAction: {
            backgroundColor: theme.palette.secondary.main
        },
        stepperContainer: {
            backgroundColor: theme.palette.secondary.main,
            marginBottom: 0
        },
        clipped: {
            clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
            margin: 0,
            height: '100%'
        },
        clippedImage: {

        }

    }),
);


export interface AddBasePackageToggleButtonProps {
    service: string;
    serviceProduct: productInterface,
    serviceImgSrc: string;
    serviceImgAlt: string;
}

const AddBasePackageToggleButton: React.FC<AddBasePackageToggleButtonProps> = (props) => {
    const classes = useStyles();
    //console.log(props)
    return (
        <React.Fragment>
            <Grid container>
                <Grid xs={7} item>
                    <figure className={classes.clipped} style={{ background: "url('" + props.serviceImgSrc + "')", backgroundSize: 'cover' }}>
                        {/* <img src={props.serviceImgSrc} alt={props.serviceImgAlt} /> */}
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