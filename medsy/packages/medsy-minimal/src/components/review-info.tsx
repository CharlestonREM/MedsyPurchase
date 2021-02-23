import React, { useReducer, createContext } from 'react';
//import mui components need for figma wireframe
import { Button, Typography } from '@material-ui/core';

export interface InfoFields {
    fieldName: string;
    fieldValue: string;
}

export interface ReviewInfoProps {
    title: string;
    info?: InfoFields[]
}

const ReviewInfo: React.FC<ReviewInfoProps> = (props) => {
    return (
        <section>
            <Typography variant="h6">{props.title} Info </Typography>
            <ul>
                {
                    props.info.map((field, index) => {
                        return (<li key={field.fieldName + index}><strong>{field.fieldName}:</strong> {field.fieldValue}</li>)
                    })
                }
            </ul>
            <Button>Update</Button>
        </section>
    );
}

export default ReviewInfo;