import { Grid, GridSize, MenuItem } from "@material-ui/core";
import { Field, useField } from "formik";
import { TextField } from "formik-material-ui";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: '1em',
        padding: '0 .25em',
        '& .MuiFormControl-root': {
            width: '100%',
            marginTop: '1em',
            padding: '0 .25em',
        }
    }
});

export interface StyledSelectProps {
    ranges: any[],
    width: GridSize,
    name: string,
    label: string
}

const StyledSelect: React.FC<StyledSelectProps> = ({ name, label, ranges, width }) => {
    const classes = useStyles();
    return (
        <Grid className={classes.root} item xs={width}>
            <Field
                component={TextField}
                type="text"
                name={name}
                label={label}
                select
                variant="outlined"
                helperText="Please select Range"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}

            >
                {ranges.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Field>
        </Grid>
    );
}

export default StyledSelect;