import React from 'react';
import _ from 'lodash';
import {
    Grid,
    Typography
} from "@material-ui/core";
//imp FORMIK
import {
    useFormikContext,
    useField
} from "formik";

import { product as productInterface } from 'interfaces/google-spreadsheet-data';
import { formikSelectionList } from "interfaces/form-values";

import AddBasePackageToggleButtonGroup from 'components/formik-controls/add-base-package-toggle-button-group'

import { StepperContext } from 'contexts/stepper/stepper.provider'

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";
import BasePackageAccordionCheckboxGroup from './formik-controls/base-package-accordion-checkbox-group';


export interface SelectBaseProductsStepProps {
    basePackages: productInterface[],
    baseServiceField: string;
    basePackageField: string;
}

const SelectBaseProductsStep: React.FC<SelectBaseProductsStepProps> = (props) => {
    const { basePackages, ...rest } = props;
    //type error fix: https://stackoverflow.com/a/55502664/14657615
    const formikContext = useFormikContext();
    const formValues: formikSelectionList = formikContext.values;
    const [baseServiceField, baseServiceMeta, baseServiceHelpers] = useField(props.baseServiceField);


    //this is for the basePackageCheckbox value for when a user clicks on the serviceLinkButton in later steps
    const [basePackageField, basePackageMeta, basePackageHelpers] = useField(props.basePackageField);

    //setup render serviceSpecificBasePackage
    const renderServiceSpecifiBasePackage = (service) => {
        const servicePackages = _.filter(basePackages, function (product) {
            return product.productService.includes(service)
        })
        //console.log('i am servicepackages', servicePackages)
        return (
            <React.Fragment>
                <h2 style={{ color: 'red' }}>i got a package for you: <em style={{ fontSize: '3em' }}>{service}</em></h2>
                <h3>yerp</h3>
                <Grid container >
                    <Grid container justify="center" >
                        <Typography style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto', color: '#999999' }}><span>{getServiceIcon(service)}</span><span>{getServiceData(service).name}</span><span style={{ color: 'black' }}>/Base Packages</span></Typography>
                    </Grid>
                    <Grid container>
                        <AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={servicePackages} />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <>
            <StepperContext.Consumer>
                {
                    (stepper) => {
                        // console.log('i am stepper', stepper)
                        const serviceSpecificBasePackage = stepper.state.serviceSpecificBasePackage;
                        return (
                            <React.Fragment>
                                {/*  //info `!null` ---> `true`; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null */}
                                {!serviceSpecificBasePackage
                                    ? (
                                        <React.Fragment>
                                            {
                                                baseServiceField.value.map((service, index) => {
                                                    let specificBasePackageProducts = [];
                                                    let basePackageOptions = [];
                                                    basePackages.map((product) => {
                                                        if (service === product.productService) {
                                                            specificBasePackageProducts.push(product);
                                                            let option = {
                                                                key: product.productName,
                                                                value: product.id,
                                                            };
                                                            basePackageOptions.push(option);
                                                        }
                                                    });

                                                    return (
                                                        <Grid container key={index}>
                                                            <Grid container justify="center" >
                                                                <Typography style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto', color: '#999999' }}><span>{getServiceIcon(service)}</span><span>{getServiceData(service).name}</span><span style={{ color: 'black' }}>/Base Packages</span></Typography>
                                                            </Grid>
                                                            {/* <Grid container>
                                                                <AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} />
                                                            </Grid> */}
                                                            <Grid container>
                                                                <BasePackageAccordionCheckboxGroup fieldName="basePackageCheckbox" label="i am bp accordion label" service={service} basePackages={specificBasePackageProducts} />
                                                            </Grid>
                                                        </Grid>
                                                    );
                                                })
                                            }
                                        </React.Fragment>
                                    )
                                    :
                                    (
                                        // this is the nested
                                        renderServiceSpecifiBasePackage(serviceSpecificBasePackage)

                                    )}

                            </React.Fragment>
                        )
                    }
                }
            </StepperContext.Consumer>
            {/* {baseServiceField.value.map((service, index) => {
                let specificBasePackageProducts = [];
                let basePackageOptions = [];
                basePackages.map((product) => {
                    if (service === product.productService) {
                        specificBasePackageProducts.push(product);
                        let option = {
                            key: product.productName,
                            value: product.id,
                        };
                        basePackageOptions.push(option);
                    }
                });

                return (
                    <Grid container key={index}>
                        <Grid container justify="center" >
                            <Typography style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, fontSize: '1.15rem', margin: '2rem auto', color: '#999999' }}><span>{getServiceIcon(service)}</span><span>{getServiceData(service).name}</span><span style={{ color: 'black' }}>/Base Packages</span></Typography>
                        </Grid>
                        <Grid container>
                            <AddBasePackageToggleButtonGroup name="basePackageCheckbox" service={service} serviceProducts={specificBasePackageProducts} />
                        </Grid>
                    </Grid>
                );
            })} */}
        </>
    );
}

export default SelectBaseProductsStep;