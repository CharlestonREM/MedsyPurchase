import React, { useContext } from 'react';
//import mui components need for figma wireframe
import { Button, Typography } from '@material-ui/core';
import { useFormik, useFormikContext } from "formik";

import NavStepButton from 'components/nav-step-button';
import { StepperContext } from "contexts/stepper/stepper.provider";
import { format } from 'date-fns'

export interface ReviewInfoProps {
    title: string;
    infoGroupName: string;
    infoStep: number;
}

const ReviewInfo: React.FC<ReviewInfoProps> = (props) => {
    //console.log('i am props in reviewinfo', props);
    const form = useFormikContext();
    const infoGroup = form.values[props.infoGroupName];
    //console.log('useFormikContext for infoGroupName', infoGroup);
    //console.log('FORM......', form)
    //console.log('I AM INFO GROUP!')
    // Object.entries(infoGroup).map((field: any[], index) => {
    //     if (typeof field[1].getMonth === 'function') {
    //         console.log(format(field[1], 'MM/dd/yyyy'))
    //     }


    // })

    //

    return (
        <section>
            <Typography variant="h6">{props.title} Info </Typography>
            <ul>
                {
                    Object.entries(infoGroup).map((field: any[], index) => {
                        //https://date-fns.org/v2.17.0/docs/Getting-Started
                        return (<li key={field[0] + index}><strong>{(field[0]).replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}:</strong> {typeof field[1].getMonth === 'function' ? format(field[1], 'MM/dd/yyyy') : field[1]}</li>)
                    })
                }
            </ul>
            <NavStepButton text="Update" action="GO_TO_SPECIFIC_STEP" payload={{ step: props.infoStep }} />
        </section>
    );
}

export default ReviewInfo;