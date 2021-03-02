import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import { Formik, Field, useFormikContext, useField } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import { useCalculator } from 'contexts/calculator/calculator.provider'
export interface RadioButtonsFmuiProps {

}

const RadioButtonsFmui: React.FC<RadioButtonsFmuiProps> = () => {
    const { isSubmitting } = useFormikContext();
    const [propertyTypeField, propertyTypeMeta, propertyTypeHelpers] = useField('propertyType');
    const { updatePropertyType } = useCalculator();

    return (
        <Field component={RadioGroup} name="propertyType" onChange={(e) => {
            propertyTypeHelpers.setValue(e.target.value)
            updatePropertyType(e.target.value)
        }}>
            <FormControlLabel
                value="house"
                control={<Radio disabled={isSubmitting} />}
                label="House"
                disabled={isSubmitting}
            />
            <FormControlLabel
                value="land"
                control={<Radio disabled={isSubmitting} />}
                label="Land"
                disabled={isSubmitting}
            />
        </Field>

    );
}

export default RadioButtonsFmui;