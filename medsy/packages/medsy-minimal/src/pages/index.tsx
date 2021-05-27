//imp IMPORT REACT
import * as React from 'react';
import _ from 'lodash';
//imp MATERIAL UI
import { Grid, FormControl } from '@material-ui/core';
//imp layout components
import TopNav from 'containers/layout/top-nav'
//imp calculator
import Calculator from "components/calculator";
import { useCalculator } from 'contexts/calculator/calculator.provider'
//imp Custom FormikControl Components
import RadioGroupTabsDiscreteSlider from 'components/formik-controls/radio-group-tabs-discrete-slider'
import { serviceData } from 'helpers/get-service-data';
//info - PRODUCT LIST
import { getGoogleData } from 'helpers/product-list/get-google-data';
//info - FORMIK STEPS FOR FORM STEPS
import * as formikStepsConfig from 'helpers/formik-steps/formik-steps-config.json'
import { StepperContext } from 'contexts/stepper/stepper.provider'
import SimpleModal from 'containers/modal/modal'
import BaseServiceToggleButtonGroup from "components/formik-controls/base-service-toggle-button-group";
import SelectBaseProductsStep from 'components/select-base-products-step'
import ConfirmSelectionStep from "components/confirm-selection-step";
import ConfirmOrder from "components/confirm-order";
import DateOrTimePicker from 'components/formik-controls/date-or-time-picker';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAvailableProducts } from 'contexts/available-products/available-products.provider';
import SelectUpgradesStep from 'components/select-upgrades-step';
import InfoBanner from 'components/info-banner';
import StyledInput from 'components/formik-controls/styled-input';
import StyledSelect from 'components/formik-controls/styled-select';

// import usePricingCalculator from 'PricingCalculator/hooks/usePricingCalculator';
import FormikStepper from 'FormikStepper/components/FormikStepper';
import FormikStep from 'FormikStepper/components/FormikStep';
import { validationSchema } from 'FormikStepper/constants/validationSchema'
import { occupancyRanges, petRanges, licenseRanges, timeRanges } from 'FormikStepper/constants/ranges';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        max: {
            maxWidth: '450px',
            margin: 'auto',
        }
    }),
);
export default function Crem({ basePackageList, upgradeList, squareFootage, licenseOptions }) {
    const classes = useStyles();
    const step1 = formikStepsConfig.formikSteps[0];
    const step1Radio = step1.fields[0];
    const stepperContext = React.useContext(StepperContext);
    // const { initializeCalculatorVariables } = useCalculator();
    const { availableBasePackages, availableUpgrades } = useAvailableProducts();

    // const isMounted = useIsMounted()
    // const lOptions = React.useMemo(() => (
    //     isMounted ? initializeCalculatorVariables(licenseOptions, squareFootage) : undefined
    // ),
    //     [isMounted, licenseOptions])
    // let avP = React.useMemo(() => {
    //     isMounted ? initializeAvailableProductsState(basePackageList, upgradeList) : undefined
    // }, [isMounted, basePackageList, upgradeList])

    return (
        <Grid container className={classes.max}>
            <Grid item xs={12}>
                <TopNav title={stepperContext.state.stepTitle} />
            </Grid>
            <Grid item xs={12}>
                <FormikStepper>
                    <FormikStep stepTitle="Tell us about your property" validationSchema={validationSchema.step1} stepperStep={1} fieldDataDisplay={'propertySize'}>
                        <RadioGroupTabsDiscreteSlider label={step1Radio.props.label} name={step1Radio.props.name} options={step1Radio.props.options} squareFootageLevels={squareFootage} />
                    </FormikStep>
                    <FormikStep stepTitle="Select your base services" stepperStep={2} validationSchema={validationSchema.step2} fieldDataDisplay={'baseServiceCheckbox'}>
                        <BaseServiceToggleButtonGroup name="baseServiceCheckbox" baseServices={serviceData} />
                    </FormikStep>
                    <FormikStep stepTitle="Select your base packages" stepperStep={2} validationSchema={validationSchema.step3} fieldDataDisplay={'basePackageCheckbox'}>
                        <SelectBaseProductsStep basePackages={availableBasePackages} baseServiceField="baseServiceCheckbox" basePackageField="basePackageCheckbox" />
                    </FormikStep>
                    <FormikStep stepTitle="Select your package upgrades" stepperStep={2} fieldDataDisplay={'upgradeCheckbox'}>
                        <SelectUpgradesStep upgrades={availableUpgrades} basePackages={availableBasePackages} basePackageField="basePackageCheckbox" />
                    </FormikStep>
                    <FormikStep stepTitle="Confirm your selections" stepperStep={2} validationSchema={validationSchema.step5}>
                        <ConfirmSelectionStep upgrades={upgradeList} products={availableBasePackages} upgradeField='upgradeCheckbox' basePackageField="basePackageCheckbox" />
                    </FormikStep>
                    <FormikStep stepTitle="Tell us about you" stepperStep={3} validationSchema={validationSchema.step6} fieldDataDisplay={'profile'}>
                        <InfoBanner title="Profile Information" imgUrl="https://i.picsum.photos/id/863/360/160.jpg?hmac=FC3Eqo8ORP1E90feXuT528igkgVnnwgnsms_x5E0NFs" />
                        <StyledInput name="profile.customerName" label="Name" width={12} />
                        <StyledInput name="profile.brokerage" label="Name of Brokerage (optional)" width={12} />
                        <StyledInput name="profile.email" label="Email address" width={12} />
                        <StyledInput name="profile.phone" label="Phone Number" width={12} />
                    </FormikStep>
                    <FormikStep stepTitle="Tell us about your property" stepperStep={3} validationSchema={validationSchema.step7} fieldDataDisplay={'property'}>
                        <InfoBanner title="Property Information" imgUrl="https://i.picsum.photos/id/193/360/160.jpg?hmac=3ykYYtiI8xVETAcHptF3vRQUuwkjskbtvFdOenscIno" />
                        <StyledInput name="profile.phone" label="Phone Number" width={12} />
                        <StyledInput name="property.propertyStreetAddress" label="Street Address" width={12} />
                        <StyledInput name="property.propertyCity" label="City" width={12} />
                        <StyledInput name="property.propertyState" label="State" width={6} />
                        <StyledInput name="property.propertyZip" label="Zip Code" width={6} />
                        <StyledSelect name="property.propertyOccupancy" label="Occupancy" width={6} ranges={occupancyRanges} />
                        <StyledInput name="property.propertyGateCode" label="Gate Code (if applicable)" width={6} />
                        <StyledSelect name="property.propertyPets" label="Do you have pets?" width={6} ranges={petRanges} />
                        <StyledInput name="property.propertyLockCode" label="Lock Code (if applicable)" width={6} />
                        <StyledInput name="property.propertySpecialRequests" label="Special Requests (e.g.)" width={12} multiline />
                    </FormikStep>
                    <FormikStep stepTitle="Let's plan the session" stepperStep={3} validationSchema={validationSchema.step8}>
                        <InfoBanner title="Session Information" imgUrl="https://i.picsum.photos/id/435/360/160.jpg?hmac=PzauqOrwyr6Bp0a2W5Cwii7j0B7V7ntq_rnAngRCPKU" />
                        <FormControl>
                            <DateOrTimePicker component="DatePicker" name="session.sessionPreferredDate" label="Preferred Date" />
                        </FormControl>
                        {/* <FormControl>
                            <DateOrTimePicker component="TimePicker" name="session.sessionPreferredTime" label="Preferred Time" />
                        </FormControl> */}
                        <StyledSelect name="session.sessionPreferredTime" label="Preferred Time" width={12} ranges={timeRanges} />
                        <FormControl>
                            <DateOrTimePicker component="DatePicker" name="session.sessionAlternateDate" label="Alternate Date" />
                        </FormControl>
                        {/* <FormControl>
                            <DateOrTimePicker component="TimePicker" name="session.sessionAlternateTime" label="Alternate Time" />
                        </FormControl> */}
                        <StyledSelect name="session.sessionAlternateTime" label="Alternate Time" width={12} ranges={timeRanges} />


                        <StyledSelect name="session.licenseType" label="Select your license type" width={12} ranges={licenseRanges} />
                        <StyledInput name="session.sessionSpecialRequests" label="Special Requests (e.g.)" width={12} multiline />
                    </FormikStep>
                    <FormikStep stepTitle="Order Confirmation" stepperStep={3}>
                        <ConfirmOrder
                            upgrades={upgradeList}
                            products={availableBasePackages}
                            upgradeField='upgradeCheckbox'
                            basePackageField="basePackageCheckbox"
                        />
                    </FormikStep>
                </FormikStepper>
                <Calculator basePackageList={basePackageList} upgradeList={upgradeList} licenseOptions={licenseOptions} squareFootage={squareFootage} />
                <SimpleModal />
            </Grid>
        </Grid>
    );
}

// const useIsMounted = () => {
//     const [isMounted, setIsMounted] = React.useState(false)
//     React.useEffect(() => {
//         setIsMounted(true)
//     }, [])
//     return isMounted
// }

export async function getServerSideProps() {
    const googleData = await getGoogleData();
    const basePackageList = googleData.basePackageList;
    const upgradeList = googleData.upgradeList;
    const licenseOptions = googleData.license;
    const squareFootage = googleData.squareFootage;
    return {
        props: {
            basePackageList,
            upgradeList,
            squareFootage,
            licenseOptions,
        },
    };
}