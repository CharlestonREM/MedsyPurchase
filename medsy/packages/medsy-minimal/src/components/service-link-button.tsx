import React, { useContext } from 'react';
import { Button, Grid, Typography } from "@material-ui/core";
import { StepperContext } from 'contexts/stepper/stepper.provider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";
import classes from '*.module.css';

//setup styles for grid
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        serviceLinkButton: {
            width: '100%',
            padding: 0,
            position: 'relative',

            '& p': {
                fontSize: '1.75em',
                textTransform: 'capitalize',
                fontWeight: 900,
                color: 'white',
                paddingLeft: '.2em'
            }
        },
        bkg: {
            margin: 0,
            padding: '2em',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        },
        linkText: {
            '& .MuiSvgIcon-root': {
                fontSize: '2em',
                //https://jsfiddle.net/dbwaoLrh/2/ for vertical align
                verticalAlign: 'middle',

            }
        },
        overlay: {
            display: 'block',
            width: '100%',
            height: '100%',
            background: 'rgb(6,0,113)',
            background: 'linear-gradient(180deg, rgba(6,0,113,0) 0%, rgba(19,55,96,.65) 100%)',
            position: 'absolute',
            zIndex: 10000,
            top: 0,
            left: 0,
            '&::after': {
                //content string trick: https://stackoverflow.com/a/43361653/14657615
                // content: '""',
                // display: 'block',
                // position: 'absolute',
            }
        }
    })
);

export interface ServiceLinkButtonProps {
    text: string;
    icon: JSX.Element;
    action: string;
    imgUrl: string;
    imgAlt: string;
    payload?: object;
    disabled?: boolean;
}

const ServiceLinkButton: React.FC<ServiceLinkButtonProps> = (props) => {
    const { dispatch: dispatchStepper } = useContext(StepperContext);
    const { text, icon, imgUrl, imgAlt, action, disabled, ...rest } = props;
    let { payload } = props;
    const classes = useStyles();
    return (

        <Grid item xs={12}>
            <Button className={classes.serviceLinkButton} onClick={() => {
                if (payload === undefined) {
                    payload = {}
                }
                dispatchStepper({ type: action, payload: payload })
                console.log('i am navstepbutton props:', action, payload);
            }} {...rest} disabled={disabled}>
                <Grid container component="figure" className={classes.bkg} style={{ backgroundImage: 'url("' + imgUrl + '")' }}>
                    <Grid item xs={12} component="figcaption">
                        <Typography className={classes.linkText}>{icon}{text}</Typography>
                    </Grid>
                </Grid>
                <div className={classes.overlay}></div>
            </Button>

        </Grid>
    );
}

export default ServiceLinkButton;