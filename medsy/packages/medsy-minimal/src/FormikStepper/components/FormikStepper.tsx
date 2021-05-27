import _ from 'lodash';
import { FormikConfig, FormikValues } from 'formik';
import React from 'react';
import { StepperContext } from 'contexts/stepper/stepper.provider'
import { FormikStepProps } from '../interfaces/FormikStep'
import { Form, Formik } from 'formik';
import { Grid, Button, LinearProgress, Stepper, Step, StepLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { initialValues } from '../constants/initialValues'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Calculator from 'components/calculator'
import { onSubmit } from 'helpers/submitForm';
//data displays
import FormDataDisplay from 'components/data-displays/form-data-display';
import CalculatorContextDataDisplay from 'components/data-displays/calculator-context-data-display';
import FieldDataDisplay from 'components/data-displays/field-data-display';
import AvailableProductsContextDataDisplay from 'components/data-displays/available-products-context-data-display'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepperAction: {
            backgroundColor: theme.palette.secondary.main
        },
        stepperContainer: {
            backgroundColor: theme.palette.secondary.main,
            marginBottom: 0
        }
    }),
);

export interface FormikStepperProps extends Pick<FormikConfig<FormikValues>, 'children'> {

}

const FormikStepper: React.FC<FormikStepperProps> = ({ children, ...props }) => {
    const { state, dispatch } = React.useContext(StepperContext);
    const { step } = state;
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { setStepNumber: 'test' })
        }
        return child
    })
    const childrenArray = childrenWithProps as React.ReactElement<FormikStepProps>[];
    const currentChild = childrenArray[step];
    let stepperSteps = childrenArray.map((child) => child.props.stepperStep);
    const totalSteps = [...new Set(stepperSteps)];
    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    function isBasePackageStep() {
        return step === 2;
    }
    const classes = useStyles();
    return (

        <Formik {...props}
            initialValues={initialValues}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await onSubmit(values, helpers);
                    // await props.onSubmit(values, helpers);
                    console.log('i am last step')
                } else {
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
                        const bpackServices = _.uniq(_.map(values.basePackageCheckbox, (string) => {
                            return string.replace(/[0-9]/g, '');
                        }))
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
                        {currentChild}

                        {isSubmitting && <LinearProgress />}

                        {isLastStep() ?
                            <Button disabled={isSubmitting} type="submit" color="primary" variant="contained" onClick={() => {
                                async (values, helpers) => {
                                    await onSubmit(values, helpers);
                                }
                            }}>Place Order</Button>
                            :
                            null}

                        {/* <Calculator /> */}
                        {/* {currentChild.props.fieldDataDisplay !== undefined ? <FieldDataDisplay fieldName={currentChild.props.fieldDataDisplay} color="violet" /> : null} */}
                        {/* <AvailableProductsContextDataDisplay color='dodgerblue' />
                        <CalculatorContextDataDisplay color='greenyellow' />
                        <FormDataDisplay values={values} errors={errors} isSubmitting={isSubmitting} /> */}
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik >
    )
}

export default FormikStepper;