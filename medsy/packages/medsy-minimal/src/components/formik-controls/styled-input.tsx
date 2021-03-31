import React from 'react'
import { Grid, GridSize, TextField } from '@material-ui/core';
import { Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
export interface StyledInputProps {
    name: string;
    label: string;
    width: GridSize;
    multiline?: boolean;
}
const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: '1em',
        padding: '0 .25em',
    }
});

import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';


function UpperCasingTextField(props: TextFieldProps) {
    const {
        form: { setFieldValue },
        field: { name },
    } = props;
    const onChange = React.useCallback(
        (event) => {
            const { value } = event.target;
            setFieldValue(name, value ? value : '');
        },
        [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}



const StyledInput: React.FC<StyledInputProps> = ({ name, label, width, multiline, ...rest }) => {
    const classes = useStyles();

    return (

        <Grid className={classes.root} item xs={width}>
            <Field className={classes.root} name={name} label={label} multiline={multiline} variant="outlined" component={UpperCasingTextField} />
        </Grid>
    );
}

export default StyledInput;