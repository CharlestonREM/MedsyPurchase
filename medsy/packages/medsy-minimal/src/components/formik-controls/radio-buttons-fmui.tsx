import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import { Formik, Field, useFormikContext, useField } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import { useCalculator } from 'contexts/calculator/calculator.provider'
import { useAvailableProducts } from 'contexts/available-products/available-products.provider';
import _ from 'lodash'

export interface RadioButtonsFmuiProps {

}

const RadioButtonsFmui: React.FC<RadioButtonsFmuiProps> = () => {
    const { isSubmitting } = useFormikContext();
    const [propertyTypeField, propertyTypeMeta, propertyTypeHelpers] = useField('propertyType');
    const [basePackageCheckboxField, basePackageCheckboxMeta, basePackageCheckboxHelpers] = useField('basePackageCheckbox');
    const [upgradeCheckboxField, upgradeCheckboxMeta, upgradeCheckboxHelpers] = useField('upgradeCheckbox');
    const { updatePropertyType } = useCalculator();
    const { availableBasePackages, availableUpgrades, removeNoLandProducts, returnNoLandProducts, allBasePackages, allUpgrades } = useAvailableProducts();

    const removeNoLandFromSelected = (field, setField, allList) => {
        console.log(field, setField)
        let newValue = [];
        //grab all products from ids in idArray
        _.forEach(field.value, (fieldName) => {
            console.log('i am the find:', _.find(allList, { 'id': fieldName }))
            newValue.push(_.find(allList, { 'id': fieldName }))
        })
        newValue = _.reject(newValue, { 'propertyType': 'no land' });
        //pull all field ids into new array
        newValue = _.map(newValue, 'id');
        setField(newValue)
        //remove all products returned that have the property type noland from the field
        //set the field value to this new array
    }


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
                //removeNoLandProducts from currently selected basePackages
                removeNoLandFromSelected(basePackageCheckboxField, basePackageCheckboxHelpers.setValue, allBasePackages);
                //remove no land products from currently selected upgrades
                removeNoLandFromSelected(upgradeCheckboxField, upgradeCheckboxHelpers.setValue, allUpgrades);
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