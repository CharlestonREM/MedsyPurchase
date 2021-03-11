import {
    Grid,
    Typography
} from "@material-ui/core";
//imp FORMIK
import {
    useFormikContext,
    useField
} from "formik";
import _ from 'lodash'
import { product as productInterface } from 'interfaces/google-spreadsheet-data';
import { formikSelectionList } from "interfaces/form-values";

import AddBasePackageToggleButtonGroup from 'components/formik-controls/add-base-package-toggle-button-group'
import UpgradeAccordionCheckboxGroup from 'components/formik-controls/upgrade-accordion-checkbox-group'


import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";

export interface SelectUpgradesStepProps {
    upgrades: productInterface[],
    basePackages: productInterface[],
    basePackageField: string;
}

const SelectUpgradesStep: React.FC<SelectUpgradesStepProps> = (props) => {
    const { basePackages, upgrades, ...rest } = props;
    const formikContext = useFormikContext();
    const formValues: formikSelectionList = formikContext.values;
    const [basePackageField, basePackageMeta, basePackageHelpers] = useField(props.basePackageField);


    //go through basePackageCheckbox arrayIds and get productservicetype and push to selected services
    const selectedBasePackages = [];
    _.forEach(basePackageField.value, (productId) => {
        selectedBasePackages.push(_.find(basePackages, { 'id': productId }))
    });
    // _.filter(upgrades, { 'productService': 'u' })

    // console.log()

    let services = _.uniq(_.map(selectedBasePackages, 'productService'));
    console.log(services)

    return (
        <>

            {
                services.map((service, index) => {
                    // todo - if check is needed for whether service has special upgrades or not
                    return (
                        <Grid container key={index}>
                            <Grid container direction="row" alignItems="center" >
                                <Typography style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto', color: '#999999' }}><span>{getServiceIcon(service)}</span><span>{getServiceData(service).name}</span><span style={{ color: 'black' }}>/Upgrades</span></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <UpgradeAccordionCheckboxGroup upgrades={upgrades} service={service} fieldName="upgradeCheckbox" label="i am label" />
                            </Grid>
                            {/* <Grid item xs={12}><AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} /></Grid> */}
                        </Grid>
                    )
                })
            }
            <Grid container>
                <Grid container direction="row" alignItems="center" >
                    <Typography style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto', color: '#999999' }}><span>{getServiceIcon('u')}</span><span>{getServiceData('u').name}</span><span style={{ color: 'black' }}>/Upgrades</span></Typography>
                </Grid>
                <Grid item xs={12}>
                    <UpgradeAccordionCheckboxGroup upgrades={upgrades} service="u" fieldName="upgradeCheckbox" label="i am label" />
                </Grid>
                {/* <Grid item xs={12}><AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} /></Grid> */}
            </Grid>
        </>
    );
}

export default SelectUpgradesStep;