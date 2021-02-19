//imp IMPORT REACT
import * as React from 'react';
//imp MATERIAL UI
import { Box, Card, CardContent, Typography, Button, LinearProgress, FormControl, FormHelperText, FormGroup, MenuItem, Stepper, Step, StepLabel, StepIcon } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
//imp FORMIK
import { Field, Form, Formik, useFormikContext, ErrorMessage, FormikConfig, FormikValues, useFormik } from 'formik';
//imp FORMIK-MATERIAL-UI LIBRARY OF BINDINGS
import { CheckboxWithLabel, TextField, Switch } from 'formik-material-ui';
//imp Yup
import * as Yup from 'yup';
//imp calculator
import Calculator from "components/calculator";
//radio imports
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';


//imp Custom FormikControl Components
import RadioGroupTabsDiscreteSlider from 'components/formik-controls/radio-group-tabs-discrete-slider'
import RadioButtons from 'components/formik-controls/radio-buttons'
import CheckboxGroup from 'components/formik-controls/checkbox-group'




import { getProducts } from 'helpers/get-products';
//info - PRODUCT LIST
import { getBasePackageList } from "helpers/product-list/get-base-package-list";
import { getUpgradeList } from "helpers/product-list/get-upgrade-list";
//info - FORMIK STEPS FOR FORM STEPS
import * as formikStepsConfig from 'helpers/formik-steps/formik-steps-config.json'


//use state
import { useState } from 'react';
import { Event } from '@material-ui/icons';

import BaseProductCheckboxStep from 'components/baseProductCheckboxStep'
import UpgradeCheckboxStep from "components/formik-controls/upgradeCheckboxStep";
import ConfirmSelectionStep from "components/confirm-selection-step";









//component
//---> you have to pass in `products` as a parameter of the component, i.e. as arbitrary arguments, i.e. as props!
export default function Crem({ products, basePackageList, upgradeList }) {


    console.log("formikStepsConfig", formikStepsConfig.formikSteps)
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
            value: '0-2000',
            label: 'Under 2,000 Sq. Ft.',
        },
        {
            value: '2000-3499',
            label: '2,000 - 3,499 Sq. Ft.',
        },
        {
            value: '3500-4999',
            label: '3,500 - 4,999 Sq. Ft.',
        },
        {
            value: '5000-6499',
            label: '5,000 - 6,499 Sq. Ft.',
        },
        {
            value: '6500-7999',
            label: '6,500 - 7,999 Sq. Ft.'
        },
        {
            value: '8000-9499',
            label: '8,000 - 9,499 Sq. Ft.'
        },
        {
            value: '9500-10999',
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
        propertySize: '0-2000',
        baseServiceCheckbox: '',
        basePackageCheckbox: '',
        upgradeCheckbox: '',
        confirmSelectionCheckbox: false,
        customerName: '',
        brokerage: '',
        email: '',
        phone: '',
        propertyStreetAddress: '',
        propertyCity: '',
        propertyState: '',
        propertyZip: '',
        propertyOccupancy: true,
        propertyGateCode: '',
        propertyPets: '',
        propertyLockCode: '',
        propertySpecialRequests: '',
        sessionPreferredDate: '',
        sessionPreferredTime: '',
        sessionAlternateDate: '',
        sessionAlternateTime: '',
        licenseType: 'single',
        sessionSpecialRequests: ''
    }
    //> onSubmit handler to pass to Formik component
    const onSubmit = async (values, { setSubmitting }) => {
        alert('clicked submit')
        console.log('submit button was clicked.VALUES:', values);
        //employ javascripts global fetch method for easy,logical way to fetch resources asynchronously across the network
        //employ the await operator to wait for the returned promise; the await operator is used inside the async function started above because this is the only context the operator can be used. the syntax is [rv] await expression; so it awaits an expression that is a Promise or any value to wait for. the rv is the returned value;  it returns the fulfilled value of the promise, or the value itself if its not the promise
        const res = await fetch('/api/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        console.log('i am res in postData:')
        console.log(res);
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
        propertyType: Yup.string(),
        propertySize: Yup.string()
        //propertySize: Yup.number().typeError('it has to be number').required('Required'),
        // baseServiceCheckbox: Yup.string().required('Required'),
        // basePackageCheckbox: Yup.string().required('Required'),
        // upgradeCheckbox: Yup.string().required('Required'),
        // confirmSelectionCheckbox: Yup.string().required('Required'),
        // customerName: Yup.string().required('Required'),
        // brokerage: Yup.string().required('Required'),
        // email: Yup.string()
        //     .email('Invalid email format')
        //     .required('Required'),
        // phone: Yup.string().required('Required'),
        // propertyStreetAddress: Yup.string().required('Required'),
        // propertyCity: Yup.string().required('Required'),
        // propertyState: Yup.string().required('Required'),
        // propertyZip: Yup.string().required('Required'),
        // propertyOccupancy: Yup.string().required('Required'),
        // propertyGateCode: Yup.string().required('Required'),
        // propertyPets: Yup.string().required('Required'),
        // propertyLockCode: Yup.string().required('Required'),
        // propertySpecialRequests: Yup.string().required('Required'),
        // sessionPreferredDate: Yup.string().required('Required'),
        // sessionPreferredTime: Yup.string().required('Required'),
        // sessionAlternateDate: Yup.string().required('Required'),
        // sessionAlternateTime: Yup.string().required('Required'),
        // licenseType: Yup.string().required('Required'),
        // sessionSpecialRequests: Yup.string().required('Required')
    })




    return (
        <Card>
            <CardContent>
                <FormikStepper initialValues={initialValues} onSubmit={onSubmit} >



                    <FormikStep validationSchema={step1ValidationSchema} stepperStep={1}>


                        <RadioButtons label="Radio Topic"
                            name="propertyType"
                            options={radioOptions} />


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
                        >
                            {ranges.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>






                    </FormikStep>

                    <FormikStep stepperStep={2}>
                        <CheckboxGroup label="Checkbox Topics"
                            name="baseServiceCheckbox"
                            options={checkboxOptions} />
                    </FormikStep>
                    <FormikStep stepperStep={2}>
                        <BaseProductCheckboxStep basePackages={basePackageList} />
                    </FormikStep>
                    <FormikStep stepperStep={2}>
                        <UpgradeCheckboxStep upgrades={upgradeList} products={basePackageList} />
                    </FormikStep>
                    <FormikStep stepperStep={2}>
                        <ConfirmSelectionStep upgrades={upgradeList} products={basePackageList} upgradeField='upgradeCheckbox' basePackageField="basePackageCheckbox" />
                    </FormikStep>
                    <FormikStep stepperStep={3}>
                        <FormControl>
                            <Field name="customerName" label="Name" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="brokerage" label="Name of Brokerage (optional)" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="email" label="Email address" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="phone" label="Phone Number" component={TextField} />
                        </FormControl>
                    </FormikStep>
                    <FormikStep stepperStep={3}>
                        <FormControl>
                            <Field name="propertyStreetAddress" label="Street Address" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="propertyCity" label="City" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="propertyState" label="State" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="propertyZip" label="Zip Code" component={TextField} />
                        </FormControl>
                        <FormControl>
                            //todo - use custom antswitcy yes or no based on this: - https://codesandbox.io/s/x8bz8
                            <Box margin={1}>
                                <FormControlLabel
                                    control={
                                        <Field component={Switch} type="checkbox" name="propertyOccupancy" />
                                    }
                                    label="the property is occupied"
                                />
                            </Box>
                        </FormControl>
                        <FormControl>
                            <Field name="propertyGateCode" label="Gate Code (if applicable)" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="propertyPets" label="Do you have pets?" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="propertyLockCode" label="Lock Code (if applicable)" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="propertySpecialRequests" label="Special Requests (e.g.)" component={TextField} />
                        </FormControl>
                    </FormikStep>
                    <FormikStep stepperStep={3}>
                        <FormControl>
                            <Field name="sessionPreferredDate" label="Preferred Date" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="sessionPreferredTime" label="Preferred Time" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="sessionAlternateDate" label="Alternate Date" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="sessionAlternateTime" label="Alternate Time" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="licenseType" label="Select your license type" component={TextField} />
                        </FormControl>
                        <FormControl>
                            <Field name="sessionSpecialRequests" label="Special Requests (e.g.)" component={TextField} />
                        </FormControl>
                    </FormikStep>
                    <FormikStep stepperStep={3}>
                        <h1>confirm order</h1>

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


                <Calculator />






            </CardContent>
        </Card >
    );
}

export async function getServerSideProps() {
    const products = await getProducts();
    const basePackageList = await getBasePackageList();
    const upgradeList = await getUpgradeList();

    return {
        props: {
            products,
            basePackageList,
            upgradeList
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
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>;
}


//>`FormikStepper` component will have same inputs as Formik
//>     - this custom component will be given same props as `Formik` component
//>     - `FormikConfig` with type `FormikValues` will be the props of this stepper, which we import above
//>         - this will allow the stepper to receive the same inputs as Formik
//?     - do we use the spread operator to place all the props of Formik onto our custom FormikStepper component
//?     - why do we pass the children

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    console.log('i am Formik', Formik)
    console.log('props', props)
    //info -- push children to an array of components that are the children of our custom `FormikStepper` components; i.e. steps
    //> employ TypeScript `as` keyword for Type Assertion to tell the compiler to consider the object as another type than the type the compiler infers the object to be
    //>     -the type is defined by our interface above
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];

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
    const [step, setStep] = useState(0);
    //>this seems based on the `activeStep` prop on mui `<Stepper />` component
    // todo - check ref: https://material-ui.com/api/stepper/
    // console.log('i am `step`', step)
    // console.log('i am `childrenArray`:', childrenArray);
    const currentChild = childrenArray[step];
    console.log('i am `currentChild`:', currentChild)


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
                    setStep(s => s + 1);
                }
            }}>
            {({ values, errors, isSubmitting }) => (
                <Form>
                    {/* //info Material UI `Stepper` Component */}
                    <Stepper activeStep={currentChild.props.stepperStep - 1}>
                        {/* //? do we need to change the `i` iterator value as the unique key */}
                        {/* {
                        stepperSteps.map((stepperStep, i) => {
                            return (
                                <Step key={i}>
                                    <StepLabel icon={stepperStep}></StepLabel>
                                </Step>
                            )
                        })
                    } */}


                        {/* // > implement multistep fix from codesandbox */}
                        {totalSteps.map((step, index) => (
                            <Step key={step}>
                                <StepLabel>
                                    {/* {index}
                                <br />
                                {currentChild.props.stepperStep}
                                <br />
                                {step} */}
                                </StepLabel>
                            </Step>
                        ))}




                    </Stepper>

                    {/* //> render only the dom/React.element contained within the `currentChild` const variable */}

                    {currentChild}




                    <Box bgcolor="#e0e0e0">
                        <Typography>Formik Form and Data Values</Typography>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Box>


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
                    {step > 0 ? <Button onClick={() => setStep(s => s - 1)}>Back</Button> : null}
                    <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
                </Form>
            )}
        </Formik >
    )
}
