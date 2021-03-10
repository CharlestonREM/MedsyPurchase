import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import { Formik, Field, useFormikContext, useField } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { useAvailableProducts } from 'contexts/available-products/available-products.provider';

export interface RadioButtonsFmuiProps {

}

const RadioButtonsFmui: React.FC<RadioButtonsFmuiProps> = () => {
    const { isSubmitting } = useFormikContext();
    const [propertyTypeField, propertyTypeMeta, propertyTypeHelpers] = useField('propertyType');
    const { updatePropertyType } = useCalculator();
    const { availableBasePackages, availableUpgrades, removeNoLandProducts, returnNoLandProducts } = useAvailableProducts();


    return (
        <Field component={RadioGroup} name="propertyType" onChange={(e) => {
            propertyTypeHelpers.setValue(e.target.value)
            updatePropertyType(e.target.value)
            if (e.target.value === 'land') {
                console.log('i am land')
                console.log('i am available upgrades', availableUpgrades)
                //remove no land products from availabe products
                removeNoLandProducts({
                    basePackageList: availableBasePackages,
                    upgradeList: availableUpgrades
                })
            } else {
                returnNoLandProducts();
            }
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