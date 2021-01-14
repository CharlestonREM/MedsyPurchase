//imp IMPORT REACT
import * as React from 'react';
//imp MATERIAL UI
import { Card, CardContent, Typography, Button, LinearProgress, FormControl, FormHelperText, FormGroup } from '@material-ui/core';
//imp FORMIK
import { Field, Form, Formik, ErrorMessage, FormikConfig, FormikValues } from 'formik';
//imp FORMIK-MATERIAL-UI LIBRARY OF BINDINGS
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
//imp Yup
import * as Yup from 'yup';

//radio imports
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';






import { getProducts } from 'helpers/get-products';


//use state
import { useState } from 'react';





//component
//---> you have to pass in `products` as a parameter of the component, i.e. as arbitrary arguments, i.e. as props!
export default function Crem({ products }) {

    /* 
    ! -----------------------
    ! FORMIK CODE BEGINS
    ! -----------------------
    info I am using Formik to set up the form that will send data to the google spreadsheet and formik-material-ui to link material-ui user interfac library to formiks form control
 */
    //> set up initialValues parameter for Formik component
    //  >Formik will make these values available to render methods component as `values`
    const initialValues = {
        propertyType: '',
        propertySize: 0,
        baseServiceCheckbox: '',
        basePackageCheckbox: '',
        upgradeCheckbox: '',
        confirmSelectionCheckbox: '',
        customerName: '',
        brokerage: '',
        email: '',
        phone: '',
        propertyStreetAddress: '',
        propertyCity: '',
        propertyState: '',
        propertyZip: '',
        propertyOccupancy: '',
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
    const validationSchema = Yup.object({
        propertyType: Yup.string().required('Required'),
        propertySize: Yup.number().typeError('it has to be number').required('Required'),
        baseServiceCheckbox: Yup.string().required('Required'),
        basePackageCheckbox: Yup.string().required('Required'),
        upgradeCheckbox: Yup.string().required('Required'),
        confirmSelectionCheckbox: Yup.string().required('Required'),
        customerName: Yup.string().required('Required'),
        brokerage: Yup.string().required('Required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        phone: Yup.string().required('Required'),
        propertyStreetAddress: Yup.string().required('Required'),
        propertyCity: Yup.string().required('Required'),
        propertyState: Yup.string().required('Required'),
        propertyZip: Yup.string().required('Required'),
        propertyOccupancy: Yup.string().required('Required'),
        propertyGateCode: Yup.string().required('Required'),
        propertyPets: Yup.string().required('Required'),
        propertyLockCode: Yup.string().required('Required'),
        propertySpecialRequests: Yup.string().required('Required'),
        sessionPreferredDate: Yup.string().required('Required'),
        sessionPreferredTime: Yup.string().required('Required'),
        sessionAlternateDate: Yup.string().required('Required'),
        sessionAlternateTime: Yup.string().required('Required'),
        licenseType: Yup.string().required('Required'),
        sessionSpecialRequests: Yup.string().required('Required')
    })


    return (
        <Card>
            <CardContent>
                <FormikStepper initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {/* 
                    //? Getting Started docs has me passing submitForm variable as parameter in an anonymous function
                        //?is it an anonymous render function?
                     */}
                    {/* {({ submitForm, isSubmitting }) => ( */}

                    {/* 
                                //info place fields here from initial values
                             */}
                    <div>
                        <FormControl>
                            <Field component={RadioGroup} name="propertyType">
                                <FormHelperText>Is the property we're shooting land or a house?</FormHelperText>
                                <FormControlLabel
                                    value={products[0].name}
                                    control={<Radio />}
                                    label={products[0].name}
                                />
                                <FormControlLabel
                                    value="land"
                                    control={<Radio />}
                                    label="Land"
                                />
                            </Field>
                            <ErrorMessage name="propertyType" />
                        </FormControl>
                        <FormControl>
                            <Field name="propertySize" type="number" component={TextField} label="Property Size" />

                        </FormControl>
                    </div>

                    <div>
                        <FormControl>
                            <FormGroup>
                                <Field name="baseServiceCheckbox" type="checkbox" component={CheckboxWithLabel} Label={{ label: 'Photography' }} />
                            </FormGroup>
                        </FormControl>

                    </div>
                    <div>
                        <FormControl>
                            <Field name="basePackageCheckbox" type="checkbox" label="Select your base package" component={CheckboxWithLabel} Label={{ label: 'Twilight' }} />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <Field name="upgradeCheckbox" type="checkbox" label="Select your upgrade" component={CheckboxWithLabel} Label={{ label: 'amenities' }} />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <Field name="confirmSelectionCheckbox" label="Confirm your selection" component={TextField} />
                        </FormControl>
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                            <Field name="propertyOccupancy" label="Property Occupancy" component={TextField} />
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
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <h1>confirm order</h1>
                        {/* 
                            //info the Button
                             */}

                        {/* {isSubmitting && <LinearProgress />} */}
                        <Button
                            variant="contained"
                            color="primary"
                        /* disabled={isSubmitting} */
                        /* onClick={submitForm} */
                        >
                            Submit
                            </Button>

                        {/* )} */}
                    </div>
                </FormikStepper>
            </CardContent>
        </Card >
    );
}

export async function getServerSideProps() {
    const products = await getProducts();
    return {
        props: {
            products,
        },
    };
}

/* 
!----------------------------
!BRUNO FORMIK STEPPER CODE BELOW
!-----------------------------
 */
//>`FormikStepper` component will have same inputs as Formik
//>     - this custom component will be given same props as `Formik` component
//>     - `FormikConfig` with type `FormikValues` will be the props of this stepper, which we import above
//>         - this will allow the stepper to receive the same inputs as Formik
//?     - do we use the spread operator to place all the props of Formik onto our custom FormikStepper component
//?     - why do we pass the children

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children);

    const [step, setStep] = useState(0);

    const currentChild = childrenArray[step];


    //info -- return jsx to a render method for the FormikStepper component
    return (

        <Formik {...props}>
            <Form>
                {currentChild}
            </Form>
        </Formik>
    )
}
