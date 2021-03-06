import React, { useContext } from 'react';
//import mui components need for figma wireframe
import { Button, Typography } from '@material-ui/core';
import { useFormik, useFormikContext } from "formik";

import NavStepButton from 'components/nav-step-button';
import { StepperContext } from "contexts/stepper/stepper.provider";
import { format } from 'date-fns'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import classes from '*.module.css';
import _ from 'lodash';

export interface ReviewInfoProps {
    title: string;
    infoGroupName: string;
    infoStep: number;
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
            // 'li': {
            //     'strong': {
            //         color: "red"
            //     }
            // }
        },
        label: {
            textTransform: 'capitalize'
        }
    }),
);

const ReviewInfo: React.FC<ReviewInfoProps> = (props) => {

    const form = useFormikContext();
    const infoGroup = form.values[props.infoGroupName];
    const classes = useStyles();

    const infoArray = [];


    console.log('do it in the ex block');
    console.log(props)





    return (
        <section className={classes.root}>
            <Typography variant="h6">{props.title} Info </Typography>
            <ul>
                {
                    Object.entries(infoGroup).map((field: any[], index) => {
                        let timeFormat = (field[0]).toLowerCase();
                        if (timeFormat.includes('time')) {
                            timeFormat = "hh:mm aaaaa'm'";
                        } else if (timeFormat.includes('date')) {
                            timeFormat = 'MM/dd/yyyy';
                        }
                        // if (isDate)
                        //https://date-fns.org/v2.17.0/docs/Getting-Started
                        // return (<li key={field[0] + index}><strong>{(field[0]).replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}:</strong> {typeof field[1].getMonth === 'function' ? format(field[1], timeFormat) : field[1]}</li>)
                        return (
                            <li key={field[0] + index}>
                                <strong className={classes.label}>{field[0]}:</strong>
                                {field[1].toString()}
                            </li>
                        )
                    })
                }
            </ul>
            <NavStepButton text="Update" action="GO_TO_SPECIFIC_STEP" payload={{ step: props.infoStep }} />
        </section>
    );
}

export default ReviewInfo;