//useEffect info:
import { useEffect } from 'react';
import { Card, CardContent, Typogrpahy, Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

//radio imports
import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
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
        const { value, name } = e.currentTarget;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
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


    return (
        <Card>
            <CardContent>
                <Products items={products} ref={elRef} />

                <Formik initialValues={{
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
                    licenseType: '',
                    sessionSpecialRequests: ''
                }} onSubmit={() => { }}>
                    <Form>
                        <Field component={RadioGroup} name="propertyType">
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
                        <Field name="propertySize" component={TextField} label="Property Size" />
                        <div className="flex flex-col p-30px">
                            <Button className="big w-full" onClick={postData} >
                                Order Now
        </Button>
                        </div>
                    </Form>
                </Formik>
            </CardContent>
        </Card>
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
