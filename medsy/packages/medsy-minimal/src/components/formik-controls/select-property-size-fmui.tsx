import { FormControlLabel, MenuItem, Radio, LinearProgress } from '@material-ui/core';
import { Formik, Field, useFormikContext, useField } from 'formik';
import { TextField } from 'formik-material-ui';
import { useCalculator } from 'contexts/calculator/calculator.provider'
export interface SelectPropertySizeFmuiProps {
    ranges: any[]
}

const SelectPropertySizeFmui: React.FC<SelectPropertySizeFmuiProps> = (props) => {
    const [propertySizeField, propertySizeMeta, propertySizeHelpers] = useField('propertySize');
    const { updatePropertySize } = useCalculator();
    return (
        <Field
            component={TextField}
            type="text"
            name="propertySize"
            label="Property Size"
            select
            variant="standard"
            helperText="Please select Range"
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e) => {
                console.log('i changed size', e.target.value)
                propertySizeHelpers.setValue(e.target.value)
                updatePropertySize(e.target.value)

            }}

        >
            {props.ranges.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Field>
    );
}

export default SelectPropertySizeFmui;