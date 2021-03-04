//imp IMPORT REACT
import * as React from 'react';
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


import { getProducts } from 'helpers/get-products';
//info - PRODUCT LIST
import { getBasePackageList } from "helpers/product-list/get-base-package-list";
import { getUpgradeList } from "helpers/product-list/get-upgrade-list";
import { getSquareFootage } from 'helpers/product-list/get-square-footage-data'
import { getLicense } from 'helpers/product-list/get-license'
//info - FORMIK STEPS FOR FORM STEPS
import * as formikStepsConfig from 'helpers/formik-steps/formik-steps-config.json'
import { StepperContext } from 'contexts/stepper/stepper.provider'
import SimpleModal from 'containers/modal/modal'

//use state
import { useState } from 'react';
import { Event } from '@material-ui/icons';

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

import FormDataDisplay from 'components/data-displays/form-data-display';
import CalculatorContextDataDisplay from 'components/data-displays/calculator-context-data-display';
import FieldDataDisplay from 'components/data-displays/field-data-display';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SelectBaseProductStep from 'components/select-base-products-step';
//setup styles for grid
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        max: {
            maxWidth: '450px',
            margin: 'auto'
        },
        root: {
            flexGrow: 1,
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
export default function Crem({ products, basePackageList, upgradeList, squareFootage, licenseOptions }) {

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
        propertySize: -1,
        baseServiceCheckbox: [],
        basePackageCheckbox: [],
        upgradeCheckbox: [],
        confirmSelectionCheckbox: false,
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
            propertyOccupancy: true,
            propertyGateCode: '000',
            propertyPets: 'no',
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
            confirmSelectionCheckbox: Yup.bool().oneOf([true], 'Please let us know that your order is right!').required('Please let us know that your order is right!')
        }),
        step6: Yup.object({
            profile: Yup.object({
                customerName: Yup.string().required('Required'),
                brokerage: Yup.string().required('Required'),
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
                propertyOccupancy: Yup.string().required('Required'),
                propertyGateCode: Yup.string().required('Required'),
                propertyPets: Yup.string().required('Required'),
                propertyLockCode: Yup.string().required('Required'),
                propertySpecialRequests: Yup.string().required('Required'),
            })
        }),
        step8: Yup.object({
            session: Yup.object({
                sessionPreferredDate: Yup.date().typeError('Please select a valid Date').required('Required'),
                sessionPreferredTime: Yup.date().typeError('Please select a valid Date').required('Required'),
                sessionAlternateDate: Yup.date().typeError('Please select a valid Date').required('Required'),
                sessionAlternateTime: Yup.date().typeError('Please select a valid Date').required('Required'),
                licenseType: Yup.string().required('Required'),
                sessionSpecialRequests: Yup.string().required('Required')
            })
        })
    }

    //use stepper context
    const stepperContext = React.useContext(StepperContext);

    const { initializeCalculatorVariables } = useCalculator();

    // setup license data
    //https://stackoverflow.com/a/55421770/14657615
    //seems to have to watch licenseooptions changing based on this in react docs:
    //https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    React.useEffect(() => {
        initializeCalculatorVariables(licenseOptions)
    }, [licenseOptions])



    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.max}>
                <Grid item xs={12}>
                    <TopNav title={stepperContext.state.stepTitle} />
                </Grid>
                <Grid item xs={12}>


                    <Calculator />
                    {/* <Box bgcolor="red">
                        <Typography variant="h6">Field: Data Display</Typography>
                        <pre>{JSON.stringify(squareFootage, null, 2)}</pre>
                    </Box> */}


                    <FormikStepper initialValues={initialValues} onSubmit={onSubmit} >


                        {/* //TODO- through object deconstruction i pass initial values as example; i now need to dynamicaly add state as prop to `FormikStepper` component and add to `FormikStep` manually */}
                        <FormikStep stepTitle="Tell us about your property" validationSchema={validationSchema.step1} stepperStep={1}>

                            <RadioButtonsFmui />
                            <SelectPropertySizeFmui ranges={ranges} squareFootageLevels={squareFootage} />




                            {/* <RadioButtons label="Radio Topic"
                                name="propertyType"
                                onChange={() => {
                                    console.log('i changed')
                                }}
                                options={radioOptions} /> */}




                            <FieldDataDisplay fieldName='propertyType' color="violet" />
                            <CalculatorContextDataDisplay color='greenyellow' />






                        </FormikStep>

                        <FormikStep stepTitle="Select your base services" stepperStep={2} validationSchema={validationSchema.step2}>
                            {/* <CheckboxGroup label="Select a base service"
        name="baseServiceCheckbox"
        options={checkboxOptions} /> */}

                            <BaseServiceToggleButtonGroup name="baseServiceCheckbox" baseServices={serviceData} />
                        </FormikStep>
                        <FormikStep stepTitle="Select your base packages" stepperStep={2} validationSchema={validationSchema.step3}>
                            <SelectBaseProductsStep basePackages={basePackageList} baseServiceField="baseServiceCheckbox" />
                            {/* <BaseProductCheckboxStep basePackages={basePackageList} /> */}
                        </FormikStep>
                        <FormikStep stepTitle="Select your package upgrades" stepperStep={2}>
                            <UpgradeCheckboxStep upgrades={upgradeList} products={basePackageList} />
                        </FormikStep>
                        <FormikStep stepTitle="Confirm your selections" stepperStep={2} validationSchema={validationSchema.step5}>
                            <ConfirmSelectionStep upgrades={upgradeList} products={basePackageList} upgradeField='upgradeCheckbox' basePackageField="basePackageCheckbox" />
                        </FormikStep>
                        <FormikStep stepTitle="Tell us about you" stepperStep={3} validationSchema={validationSchema.step6}>
                            <FormControl>
                                <Field name="Give some property info" label="Name" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="profile.brokerage" label="Name of Brokerage (optional)" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="profile.email" label="Email address" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="profile.phone" label="Phone Number" component={TextField} />
                            </FormControl>
                        </FormikStep>
                        <FormikStep stepTitle="Give us session info" stepperStep={3} validationSchema={validationSchema.step7}>
                            <FormControl>
                                <Field name="property.propertyStreetAddress" label="Street Address" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertyCity" label="City" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertyState" label="State" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertyZip" label="Zip Code" component={TextField} />
                            </FormControl>
                            <FormControl>
                                //todo - use custom antswitcy yes or no based on this: - https://codesandbox.io/s/x8bz8
        <Box margin={1}>
                                    <FormControlLabel
                                        control={
                                            <Field component={Switch} type="checkbox" name="property.propertyOccupancy" />
                                        }
                                        label="the property is occupied"
                                    />
                                </Box>
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertyGateCode" label="Gate Code (if applicable)" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertyPets" label="Do you have pets?" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertyLockCode" label="Lock Code (if applicable)" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="property.propertySpecialRequests" label="Special Requests (e.g.)" component={TextField} />
                            </FormControl>
                        </FormikStep>
                        <FormikStep stepTitle="Tell us about your property" stepperStep={3} validationSchema={validationSchema.step8}>
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
                            <FormControl>
                                <Field name="session.licenseType" label="Select your license type" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="session.sessionSpecialRequests" label="Special Requests (e.g.)" component={TextField} />
                            </FormControl>
                        </FormikStep>
                        <FormikStep stepTitle="Order Confirmation" stepperStep={3}>
                            <ConfirmOrder
                                upgrades={upgradeList}
                                products={basePackageList}
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








                    <SimpleModal />
                </Grid>
            </Grid>
        </div>

    );
}

export async function getServerSideProps() {
    const products = await getProducts();
    const basePackageList = await getBasePackageList();
    const upgradeList = await getUpgradeList();
    const squareFootage = await getSquareFootage();
    const licenseOptions = await getLicense();

    return {
        props: {
            products,
            basePackageList,
            upgradeList,
            squareFootage,
            licenseOptions
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
}

export function FormikStep({ children, ...props }: FormikStepProps) {
    const classes = useStyles();


    return <Paper className={classes.paper} >


        {children}

        {/* <Box bgcolor="deepPink">
            <Typography>formik step props</Typography>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Box> */}
    </Paper>;
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
                            stepTitle: childrenArray[step + 1].props.stepTitle
                        },
                    });
                }
            }}>
            {({ values, errors, isSubmitting, getFieldProps }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Form>

                        <Grid container spacing={2} className={classes.stepperContainer}>
                            <Grid item xs={2}>
                                {step > 0 ? <Button onClick={() => {
                                    //setStep(s => s - 1)
                                    dispatch({
                                        type: 'STEP_BACK',
                                        payload: {
                                            step: step,
                                            stepTitle: childrenArray[step - 1].props.stepTitle
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




                        <FormDataDisplay values={values} errors={errors} isSubmitting={isSubmitting} />

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


                    </Form>
                </MuiPickersUtilsProvider>
            )}

        </Formik >

    )
}
