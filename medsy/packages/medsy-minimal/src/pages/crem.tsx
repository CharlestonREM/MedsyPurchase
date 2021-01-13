//useEffect info:
import { useEffect } from 'react';
import { Card, CardContent, Typography, Button, LinearProgress, FormControl, FormHelperText } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

//radio imports
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';

//products
//useEffect info:

import Head from 'next/head';
import Layout from 'containers/layout/layout';
import HeroBlock from 'containers/banner/hero-block';
import Products from 'containers/products';
import InstagramReview from 'containers/instagram-review';
import { getProducts } from 'helpers/get-products';
import { useRefScroll } from 'helpers/use-ref-scroll';
import { useSearch } from 'contexts/search/use-search';

//use state
import { useState, useContext } from 'react';

//import the order-submit component
// info This is the component that is returned when the success state changes to true
// info --- The success state with the initial state of false changes to true

import OrderSubmit from 'containers/drawer/views/order-submit';


//set initial state of the form values to be an argument in the useState hook
const initialState = {
    propertyType: '',
    propertySize: ''
};




//component
//---> you have to pass in `products` as a parameter of the component, i.e. as arbitrary arguments, i.e. as props!
export default function Crem({ products }) {
    //define elRef constant which will be declared as a prop of the Product components
    const { elRef, scroll } = useRefScroll({
        percentOfElement: 0,
        percentOfContainer: 0,
        offsetPX: -100,
    });
    const { searchTerm } = useSearch();

    useEffect(() => {
        if (searchTerm) return scroll();
    }, [searchTerm]);

    // info --- setSuccess function that is going to be used later

    /* 
    > i am using the useState React Hook
        >https://reactjs.org/docs/hooks-faq.html#what-does-const-thing-setthing--usestate-mean
        >https://reactjs.org/docs/hooks-state.html#tip-what-do-square-brackets-mean
        > i use javascript destructuring assignment syntax (which is a js expression) to make two new distinct variables
            >the useState hook returns an array with 2 elements
            >i declare each constant in order of the elements of the array that is returned
            >so first
    > -- the array of distinct variables state, and setState (here succes = state && setSuccess = setState) are returned from the execution of useState
    > --- during initial render, the returned state of "success" is the same as the value passed as the first argument, or initialState, so here, "false"
     */
    const [success, setSuccess] = useState(false);

    // info --- declare the constant formdata and employ the handlar setFormdata
    const [formData, setFormData] = useState(initialState);

    // info -- set onChange and setFormDAta functions
    const onChange = (e) => {
        console.log('onChange function executed.')
        console.log('here is form data BEFORE CHANGE IS REGISTERED...')
        console.log(formData)
        console.log('e.target:')
        console.log(e.target);
        const { value, name } = e.currentTarget;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log('formData after setFormData:')
        console.log(formData)
    };
    if (success) {
        return <OrderSubmit />;
    }
    console.log(products)


    /*
    
    todo  employ submitOrder handler function  and retool for crem post function
    todo remove loading attribute on button
    
    */
    const postData = async () => {
        console.log('postData button was clicked...')
        const { propertyType, propertySize } = formData;

        //employ javascripts global fetch method for easy,logical way to fetch resources asynchronously across the network
        //employ the await operator to wait for the returned promise; the await operator is used inside the async function started above because this is the only context the operator can be used. the syntax is [rv] await expression; so it awaits an expression that is a Promise or any value to wait for. the rv is the returned value;  it returns the fulfilled value of the promise, or the value itself if its not the promise
        const res = await fetch('/api/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                propertyType: `${propertyType}`,
                propertySize: propertySize,
            }),
        });
        console.log('i am res in postData:')
        console.log(res);
        if (res.status === 200) {
            setSuccess(true);

        } else {
            //setError(true);
        }
    };

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
        propertySize: '',
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
            setSuccess(true);

        } else {
            //setError(true);
        }
        // setTimeout(() => {
        //     setSubmitting(false);
        //     alert(JSON.stringify(values, null, 2));
        // }, 500);
    }


    return (
        <Card>
            <CardContent>
                <Products items={products} ref={elRef} />

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {/* 
                    //? Getting Started docs has me passing submitForm variable as parameter in an anonymous function
                        //?is it an anonymous render function?
                     */}
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            {/* 
                                //info place fields here from initial values
                             */}

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
                                <Field name="propertySize" component={TextField} label="Property Size" />
                                {isSubmitting && <LinearProgress />}
                            </FormControl>

                            <FormControl>
                                <Field name="baseServiceCheckbox" label="Select your base service" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="basePackageCheckbox" label="Select your base package" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="upgradeCheckbox" label="Select your upgrade" component={TextField} />
                            </FormControl>
                            <FormControl>
                                <Field name="confirmSelectionCheckbox" label="Confirm your selection" component={TextField} />
                            </FormControl>
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


                            {/* 
                            //info the Button
                             */}

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card >
    )
}

export async function getServerSideProps() {
    const products = await getProducts();
    return {
        props: {
            products,
        },
    };
}
