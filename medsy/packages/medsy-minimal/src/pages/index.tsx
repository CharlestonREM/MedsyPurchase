//imp IMPORT REACT
import * as React from 'react';
import _ from 'lodash';



//imp MATERIAL UI
import { Box, Card, CardContent, Grid, Typography, Button, LinearProgress, FormControl, FormHelperText, FormGroup, MenuItem, Paper, Stepper, Step, StepLabel, StepIcon } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//imp layout components
import TopNav from 'containers/layout/top-nav'

//imp FORMIK
import { Field, Form, Formik, useFormikContext, ErrorMessage, FormikConfig, FormikValues, useFormik } from 'formik';
//imp FORMIK-MATERIAL-UI LIBRARY OF BINDINGS
import { CheckboxWithLabel, TextField, Switch } from 'formik-material-ui';
//imp Yup
import * as Yup from 'yup';
//imp calculator
import Calculator from "components/calculator";
import { useCalculator } from 'contexts/calculator/calculator.provider'
//radio imports
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';


//imp Custom FormikControl Components
import RadioGroupTabsDiscreteSlider from 'components/formik-controls/radio-group-tabs-discrete-slider'
import RadioButtons from 'components/formik-controls/radio-buttons'
import CheckboxGroup from 'components/formik-controls/checkbox-group'

import { serviceData } from 'helpers/get-service-data';


//info - PRODUCT LIST
import { getBasePackageList } from "helpers/product-list/get-base-package-list";
import { getUpgradeList } from "helpers/product-list/get-upgrade-list";
import { getSquareFootage } from 'helpers/product-list/get-square-footage-data'
import { getLicense } from 'helpers/product-list/get-license'
import { getGoogleData } from 'helpers/product-list/get-google-data';

//info - FORMIK STEPS FOR FORM STEPS
import * as formikStepsConfig from 'helpers/formik-steps/formik-steps-config.json'
import { StepperContext } from 'contexts/stepper/stepper.provider'
import SimpleModal from 'containers/modal/modal'

//use state
import { useState } from 'react';
import { Event, RefreshSharp, Router } from '@material-ui/icons';

import { useRouter } from 'next/router';

import BaseServiceToggleButtonGroup from "components/formik-controls/base-service-toggle-button-group";
import BaseProductCheckboxStep from 'components/baseProductCheckboxStep'
import SelectBaseProductsStep from 'components/select-base-products-step'
import UpgradeCheckboxStep from "components/formik-controls/upgradeCheckboxStep";
import ConfirmSelectionStep from "components/confirm-selection-step";
import ConfirmOrder from "components/confirm-order";
import DateOrTimePicker from 'components/formik-controls/date-or-time-picker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import RadioButtonsFmui from 'components/formik-controls/radio-buttons-fmui'
import SelectPropertySizeFmui from 'components/formik-controls/select-property-size-fmui'

//data displays
import FormDataDisplay from 'components/data-displays/form-data-display';
import CalculatorContextDataDisplay from 'components/data-displays/calculator-context-data-display';
import FieldDataDisplay from 'components/data-displays/field-data-display';
import AvailableProductsContextDataDisplay from 'components/data-displays/available-products-context-data-display'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SelectBaseProductStep from 'components/select-base-products-step';
import { useAvailableProducts } from 'contexts/available-products/available-products.provider';

import SelectUpgradesStep from 'components/select-upgrades-step';

import DynamicIcon from 'components/dynamic-icon';
import InfoBanner from 'components/info-banner';
import StyledInput from 'components/formik-controls/styled-input';
import StyledSelect from 'components/formik-controls/styled-select';

//setup styles for grid
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        max: {
            maxWidth: '450px',
            margin: 'auto',
            // backgroundColor: '#E5E5E5'
        },
        root: {
            // flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        stepperAction: {
            backgroundColor: theme.palette.secondary.main
        },
        stepperContainer: {
            backgroundColor: theme.palette.secondary.main,
            marginBottom: 0
        }
    }),
);





//component
//---> you have to pass in `products` as a parameter of the component, i.e. as arbitrary arguments, i.e. as props!
export default function Crem({ basePackageList, upgradeList, squareFootage, licenseOptions }) {

    const classes = useStyles();

    // console.log("formikStepsConfig", formikStepsConfig.formikSteps)
    const step1 = formikStepsConfig.formikSteps[0];
    const step1Radio = step1.fields[0];

    //> enumerate and breakdown basePackageList here


    //>test radio options
    const radioOptions = [
        { key: "Land", value: "land" },
        { key: "House", value: "house" }
    ];
    //>test checkbox options
    const checkboxOptions = [
        { key: "Photography", value: "p" },
        { key: "Videography", value: "v" },
        { key: "Aerial Services", value: "a" },
        { key: "3D Services", value: "d" }
    ];
    //> test ranges with temporary select
    const ranges = [
        {
            value: -1,
            label: 'Please select the size of your house'
        },
        {
            value: 0,
            label: 'Under 2,000 Sq. Ft.',
        },
        {
            value: 1,
            label: '2,000 - 3,499 Sq. Ft.',
        },
        {
            value: 2,
            label: '3,500 - 4,999 Sq. Ft.',
        },
        {
            value: 3,
            label: '5,000 - 6,499 Sq. Ft.',
        },
        {
            value: 4,
            label: '6,500 - 7,999 Sq. Ft.'
        },
        {
            value: 5,
            label: '8,000 - 9,499 Sq. Ft.'
        },
        {
            value: 6,
            label: '9,500 - 10,999 Sq. Ft.'
        }
    ];
    const occupancyRanges = [
        {
            value: 'vacant',
            label: 'Vacant',
        },
        {
            value: 'owner-occupied',
            label: 'Owner Occupied',
        },
        {
            value: 'tenant-occupied',
            label: 'Tenant Occupied',
        }
    ];
    const petRanges = [
        {
            value: 'yes-pets',
            label: 'Yes',
        },
        {
            value: 'no-pets',
            label: 'No',
        }
    ];
    const licenseRanges = [
        {
            value: 'single',
            label: 'Single Use License',
        },
        {
            value: 'multi',
            label: 'Multi-Use License',
        }
    ];

    /* 
    ! -----------------------
    ! FORMIK CODE BEGINS
    ! -----------------------
    info I am using Formik to set up the form that will send data to the google spreadsheet and formik-material-ui to link material-ui user interfac library to formiks form control
 */
    //> set up initialValues parameter for Formik component
    //  >Formik will make these values available to render methods component as `values`
    const initialValues = {
        propertyType: 'house',
        propertySize: 0,
        baseServiceCheckbox: [],
        basePackageCheckbox: [],
        upgradeCheckbox: [],
        // confirmSelectionCheckbox: false,
        profile: {
            customerName: 'test name',
            brokerage: 'test brokerage',
            email: 'test@testemail.com',
            phone: '555-555-5555'
        },
        property: {
            propertyStreetAddress: '1776 fake st.',
            propertyCity: ' charleston',
            propertyState: 'sc',
            propertyZip: '29455',
            propertyOccupancy: null,
            propertyGateCode: '000',
            propertyPets: null,
            propertyLockCode: '555',
            propertySpecialRequests: 'i am test property special requests'
        },
        session: {
            sessionPreferredDate: null,
            sessionPreferredTime: null,
            sessionAlternateDate: null,
            sessionAlternateTime: null,
            licenseType: 'single',
            sessionSpecialRequests: ''
        }
    }
    //> onSubmit handler to pass to Formik component
    const onSubmit = async (values, { setSubmitting }) => {
        alert('clicked submit')
        // console.log('submit button was clicked.VALUES:', values);
        //employ javascripts global fetch method for easy,logical way to fetch resources asynchronously across the network
        //employ the await operator to wait for the returned promise; the await operator is used inside the async function started above because this is the only context the operator can be used. the syntax is [rv] await expression; so it awaits an expression that is a Promise or any value to wait for. the rv is the returned value;  it returns the fulfilled value of the promise, or the value itself if its not the promise
        const res = await fetch('/api/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        // console.log('i am res in postData:')
        // console.log(res);
        if (res.status === 200) {
            //setSuccess(true);

        } else {
            //setError(true);
        }
        // setTimeout(() => {
        //     setSubmitting(false);
        //     alert(JSON.stringify(values, null, 2));
        // }, 500);
    }
    //info `validationSchema` with Yup
    //> this Yup schema's keys should match those of values
    const step1ValidationSchema = Yup.object({
        propertyType: Yup.string().required('Required'),
        propertySize: Yup.string().required('Required')
        // propertySize: Yup.number().typeError('it has to be number').required('Required'),
    })
    const validationSchema = {
        step1: Yup.object({
            propertyType: Yup.string().required('Required'),
            propertySize: Yup.number().min(0).required('Required')
        }),
        step2: Yup.object({
            baseServiceCheckbox: Yup.array().min(1, "There should be at least one checked option.").required('Please select at least one service.')
        }),
        step3: Yup.object({
            basePackageCheckbox: Yup.array().min(1, "There should be at least one checked option.").required('Please select at least one base package.')
        }),
        step4: {

        },
        step5: Yup.object({
            // confirmSelectionCheckbox: Yup.bool().oneOf([true], 'Please let us know that your order is right!').required('Please let us know that your order is right!')
        }),
        step6: Yup.object({
            profile: Yup.object({
                customerName: Yup.string().required('Required'),
                brokerage: Yup.string(),
                email: Yup.string()
                    .email('Invalid email format')
                    .required('Required'),
                phone: Yup.string().required('Required'),
            })
        }),
        step7: Yup.object({
            property: Yup.object({
                propertyStreetAddress: Yup.string().required('Required'),
                propertyCity: Yup.string().required('Required'),
                propertyState: Yup.string().required('Required'),
                propertyZip: Yup.string().required('Required'),
                propertyOccupancy: Yup.string().ensure().required('Required'),
                propertyGateCode: Yup.string().required('Required'),
                propertyPets: Yup.string().ensure().required('Required'),
                propertyLockCode: Yup.string().required('Required'),
                propertySpecialRequests: Yup.string(),
            })
        }),
        step8: Yup.object({
            session: Yup.object({
                sessionPreferredDate: Yup.date().typeError('Please select a valid Date').required('Required'),
                sessionPreferredTime: Yup.date().typeError('Please select a valid Date').required('Required'),
                sessionAlternateDate: Yup.date().typeError('Please select a valid Date').required('Required'),
                sessionAlternateTime: Yup.date().typeError('Please select a valid Date').required('Required'),
                licenseType: Yup.string().required('Required'),
                sessionSpecialRequests: Yup.string()
            })
        })
    }

    //use stepper context
    const stepperContext = React.useContext(StepperContext);

    const { initializeCalculatorVariables } = useCalculator();
    const { initializeAvailableProductsState, availableBasePackages, availableUpgrades } = useAvailableProducts();


    //>! attempt with passing reference instead of calling function

    // const isMounted = useIsMounted();
    // React.useMemo(() => (
    //     //pass a reference to these handlers instead of calling the function while i'm rendering the component: https://www.reddit.com/r/reactjs/comments/ie35c2/error_cannot_update_a_component_storeprovider/g2dvjxw?utm_source=share&utm_medium=web2x&context=3
    //     isMounted ? () => {
    //         initializeCalculatorVariables(licenseOptions)
    //         initializeAvailableProductsState(basePackageList, upgradeList)
    //     } : undefined
    // ),
    //     [isMounted, licenseOptions, basePackageList, upgradeList])








    // let {availableBasePackages, availableUpgrades} = useAvailableProducts();

    // setup license data
    //https://stackoverflow.com/a/55421770/14657615
    //seems to have to watch licenseooptions changing based on this in react docs:
    //https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    // React.useEffect(() => {
    //     if (licenseOptions) initializeCalculatorVariables(licenseOptions)
    // }, [licenseOptions])

    const isMounted = useIsMounted()
    // console.log('i am isMounted', isMounted)


    const lOptions = React.useMemo(() => (
        isMounted ? initializeCalculatorVariables(licenseOptions, squareFootage) : undefined
    ),
        [isMounted, licenseOptions])


    let avP = React.useMemo(() => {
        isMounted ? initializeAvailableProductsState(basePackageList, upgradeList) : undefined
    }, [isMounted, basePackageList, upgradeList])


    // React.useEffect(() => {
    //     if (licenseOptions) {
    //         initializeCalculatorVariables(licenseOptions)
    //     }
    // }, [licenseOptions])





    return (

        <Grid container className={classes.max}>
            <Grid item xs={12}>
                <TopNav title={stepperContext.state.stepTitle} />
            </Grid>
            <Grid item xs={12}>



                <FormikStepper initialValues={initialValues} onSubmit={onSubmit} >
                    {/* //TODO- through object deconstruction i pass initial values as example; i now need to dynamicaly add state as prop to `FormikStepper` component and add to `FormikStep` manually */}
                    <FormikStep stepTitle="Tell us about your property" validationSchema={validationSchema.step1} stepperStep={1} fieldDataDisplay={'propertySize'}>



                        <RadioGroupTabsDiscreteSlider label={step1Radio.props.label} name={step1Radio.props.name} options={step1Radio.props.options} squareFootageLevels={squareFootage} />




                        {/* <RadioButtonsFmui />
                        <SelectPropertySizeFmui ranges={ranges} squareFootageLevels={squareFootage} /> */}

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
                        <FormControl>
                            <DateOrTimePicker component="TimePicker" name="session.sessionPreferredTime" label="Preferred Time" />

                        </FormControl>
                        <FormControl>
                            <DateOrTimePicker component="DatePicker" name="session.sessionAlternateDate" label="Alternate Date" />
                        </FormControl>
                        <FormControl>
                            <DateOrTimePicker component="TimePicker" name="session.sessionAlternateTime" label="Alternate Time" />

                        </FormControl>
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


                        {/* {isSubmitting && <LinearProgress />}
    <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        onClick={submitForm}
    >
        Submit
        </Button> */}


                    </FormikStep>
                </FormikStepper>







                {/* <Calculator /> */}
                {/* <FieldDataDisplay/>
                    <CalculatorContextDataDisplay/>
                    <FormDataDisplay/> */}
                <SimpleModal />
            </Grid>
        </Grid>


    );
}

const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState(false)
    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    return isMounted
}

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

/*
!----------------------------
!BRUNO FORMIK STEPPER CODE BELOW
!-----------------------------
 */


/*
   >`FormikStep` Component that will be required child of `FormikStepper`
   >   -this is to deal with validation schema being applied
*/

//pick passes the props i care about by receving a string
export interface FormikStepProps
    extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    stepperStep: number;
    stepTitle: string;
    fieldDataDisplay?: string;
}

export function FormikStep({ children, ...props }: FormikStepProps) {
    const classes = useStyles();


    return <Grid container >


        {children}

        {/* <Box bgcolor="deepPink">
            <Typography>formik step props</Typography>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Box> */}
    </Grid>;
}



//>`FormikStepper` component will have same inputs as Formik
//>     - this custom component will be given same props as `Formik` component
//>     - `FormikConfig` with type `FormikValues` will be the props of this stepper, which we import above
//>         - this will allow the stepper to receive the same inputs as Formik
//?     - do we use the spread operator to place all the props of Formik onto our custom FormikStepper component
//?     - why do we pass the children

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    // console.log('i am Formik', Formik)
    // console.log('props', props)
    // children.map((child) => {
    //     console.log('add prop to child with map function....');
    //     child.props['setStepNumber'] = 'banana'
    //     console.log(child.props)

    // })
    //info -- employ react's `useState` hook to set the state of the custom stepper component
    //> set up conditions for showing children based on current step
    //>     *we use destructuring assignment
    /*
    > i use javascript destructuring assignment syntax (which is a js expression) to make two new distinct variables
    >the `useState` hook returns an array with 2 elements
    >i declare each constant in order of the elements of the array that is returned
    >so first
    > -- the array of distinct variables state, and setState (here step = state && setStep = setState) are returned from the execution of `useState` hook
    > --- during initial render, the returned state of "step" is the same as the value passed as the first argument, or initialState, so here, the integer `0`
    > --- `0` is used as the initial state because we are creating an array of steps. arrays are zero-indexed, so this starts us with the first step
    */


    // const [step, setStep] = useState(0);
    const { state, dispatch } = React.useContext(StepperContext);
    //console.log('i am stepperContext', state)

    const { step } = state;



    //>this seems based on the `activeStep` prop on mui `<Stepper />` component
    // todo - check ref: https://material-ui.com/api/stepper/
    //console.log('i am `step`', step)
    // console.log('i am `setStep`', setStep)


    //>try to make children have props
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // console.log('i am child in React.isValidElement', React.cloneElement(child, {setStepNumber: setStep }))
            return React.cloneElement(child, { setStepNumber: 'test' })
        }
        return child
    })
    // console.log('!!!!!!!!! i am childrenwithprops', childrenWithProps)

    //info -- push children to an array of components that are the children of our custom `FormikStepper` components; i.e. steps
    //> employ TypeScript `as` keyword for Type Assertion to tell the compiler to consider the object as another type than the type the compiler infers the object to be
    //>     -the type is defined by our interface above
    const childrenArray = childrenWithProps as React.ReactElement<FormikStepProps>[];
    // const childrenArray = React.Children.toArray(childrenWithProps) as React.ReactElement<FormikStepProps>[];


    // console.log('i am `childrenArray`:', childrenArray);
    const currentChild = childrenArray[step];
    //console.log('i am `currentChild`:', currentChild)
    //testing setStep
    // setTimeout(() => {
    //     console.log('i take four seconds')
    //     setStep(5)
    // }, 4000)



    //>set up array to hold `stepperSteps`
    let stepperSteps = childrenArray.map((child) => child.props.stepperStep);
    const totalSteps = [...new Set(stepperSteps)];

    // console.log("i am stepperSteps", stepperSteps);
    // console.log("i am totalSteps", totalSteps); 



    /*
        info helper function to make code DRY
        >this function corresponds to the condition of being on the last child ofchildren array
        >       i.e. being on the last step
        >the function will return a boolean value of true/false
     */
    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    function isBasePackageStep() {
        return step === 2;
    }
    //setup some styles
    const classes = useStyles();

    //info -- return jsx to a render method for the FormikStepper component
    return (
        /*
               ? our FormikStepper component is built with Formik and has all the props of formik applied to it with the spread operator
               > this is currently a thin wrapper of Formik
               */


        <Formik {...props}
            /* //>we have to pass the activeStep's (i.e. `currentChild`'s) `validationSchema` property as the validationSchema so that the next submit button advances */
            /* //>  -i.e. each step needs and gets its own validationSchema */
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                //calling our parent when we are on the last step
                //basically if we are on the last child/last step, we tell the button to behave like a submit button
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    //but if we are not on the last step, behave like a next button
                    //todo : this will likely need to be changed later to match wireframes
                    //> setStep is the function i need to perform from within the formik step...
                    // setStep(s => s + 1);
                    //console.log('about to dispatch step next')
                    dispatch({
                        type: 'STEP_NEXT',
                        payload: {
                            step: step,
                            stepTitle: childrenArray[step + 1].props.stepTitle,
                            serviceSpecificBasePackage: null
                        },
                    });
                    //if i'm on the basepackage step
                    if (isBasePackageStep()) {
                        console.log('you are performed when NEXT is clicked when you are CURRENTLY-ON/ARLEADY-ON base package step');
                        //todo-reset the baseServiceCheckbox array value based on the current value of basePackageCheckbox array products that are present
                        //check bpack, filter and map and return an array with all services present in bpack
                        const bpackServices = _.uniq(_.map(values.basePackageCheckbox, (string) => {
                            return string.replace(/[0-9]/g, '');
                        }))
                        //reset bserv value to make bserv MATCH bpack
                        helpers.setFieldValue('baseServiceCheckbox', bpackServices)
                    }

                }
            }}>
            {({ values, errors, isSubmitting, getFieldProps }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Form>

                        <Grid container className={classes.stepperContainer}>
                            <Grid item xs={2}>
                                {step > 0 ? <Button onClick={() => {
                                    //setStep(s => s - 1)
                                    dispatch({
                                        type: 'STEP_BACK',
                                        payload: {
                                            step: step,
                                            stepTitle: childrenArray[step - 1].props.stepTitle,
                                            serviceSpecificBasePackage: null
                                        },
                                    })
                                }} ><ChevronLeftIcon /> Back</Button> : <Button disabled>Back</Button>}
                            </Grid>
                            <Grid item xs={8}>
                                {/* //info Material UI `Stepper` Component */}
                                <Stepper activeStep={currentChild.props.stepperStep - 1}>
                                    {/* // > implement multistep fix from codesandbox */}
                                    {totalSteps.map((step, index) => (
                                        <Step key={step}>
                                            <StepLabel>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Grid>
                            <Grid item xs={2}>
                                <Button type="submit">{isLastStep() ? 'Submit' : 'Next'} {!isLastStep() ? <ChevronRightIcon /> : null}</Button>
                            </Grid>
                        </Grid>


                        {/* //> render only the dom/React.element contained within the `currentChild` const variable */}


                        {currentChild}
                        {/* {React.cloneElement(currentChild, { setStepNumber: setStep })} */}






                        {/* 
                    //> when this button is clicked it executes an anonymous function 
                    //> the execution block of this function calls the useState setState method we created called `setStep`
                    //> `setStep` is used to update the state; it accepts a new state value and enqueues a re-render of the component 
                    //> because the new state is computed using the previous state, we pass a function to `setState` (`setStep` here)
                    //>     * the `setStep` function receives the previous value of the index of the `childrenArray` that holds our steps and then subtracts the state by 1
                    //>
                 */}
                        {/* //info - CONDITIONAL VALIDATION - don't show anything if step is less than 0 */}
                        {/* //> if step value is greater than 0 show Button component, show no dom via null, i.e. hide Button component from view */}


                        <Calculator />
                        {currentChild.props.fieldDataDisplay !== undefined ? <FieldDataDisplay fieldName={currentChild.props.fieldDataDisplay} color="violet" /> : null}
                        <AvailableProductsContextDataDisplay color='dodgerblue' />
                        <CalculatorContextDataDisplay color='greenyellow' />
                        <FormDataDisplay values={values} errors={errors} isSubmitting={isSubmitting} />

                    </Form>

                </MuiPickersUtilsProvider>

            )}

        </Formik >

    )
}
