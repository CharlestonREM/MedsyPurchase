import React, { useContext, useEffect } from 'react'

import { ModalContext } from 'contexts/modal/modal.provider';


import { Box, Button, FormControlLabel, Grid, Typography } from '@material-ui/core'
import { useFormikContext, useField } from "formik";
import _ from 'lodash';
//custom helpers for services
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";
//theme
import { theme } from "../theme";

import { upgrade as upgradeInterface, product as productInterface } from "interfaces/google-spreadsheet-data";
import { formikSelectionList } from "interfaces/form-values";
import { StepperContext } from 'contexts/stepper/stepper.provider';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


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
        },
        basePackageSelection: {
            paddingLeft: '0',

            '& ul': {
                paddingLeft: 0,
                // borderBottom: 'solid 1px #E0E0E0',
                '& li': {
                    borderTop: 'solid 1px #E0E0E0',
                    listStyleType: 'none',
                    paddingLeft: '2em'
                }
            },
            '& li': {
                borderTop: 'solid 1px #E0E0E0',
                padding: '1em 0',
                '& .MuiGrid-justify-xs-flex-end': {
                    paddingRight: '2em',
                },
                '& .MuiGrid-grid-xs-8': {
                    paddingLeft: '2em'
                },
                '& button': {
                    padding: '.5em 0',
                    justifyContent: 'flex-end',
                    '& p': {
                        fontSize: '.75em',
                        textTransform: 'capitalize',
                        textDecoration: 'underline'

                    }
                }

            }
        },
        additionalUpgrades: {
            paddingLeft: '0',
            '& li': {
                borderTop: 'solid 1px #E0E0E0',
                padding: '1em 0',
                paddingLeft: '2em',
                '& button': {
                    padding: '.5em 0',
                    justifyContent: 'flex-end',
                    '& p': {
                        fontSize: '.75em',
                        textTransform: 'capitalize',
                        textDecoration: 'underline'

                    }
                }

            }
        },
        basePackageName: {
            fontSize: '1.25em',
            fontWeight: 900,
            textTransform: 'capitalize'
        },
        selectionType: {
            fontSize: '.75em'
        },
        price: {
            color: 'black',
            fontSize: '1em',
            paddingRight: '2em'
        },
        upgradeName: {
            fontSize: '1.25em',
            fontWeight: 400,
            textTransform: 'capitalize'
        },
        selectionIcon: {
            textAlign: 'center',
            '& [class*="MuiSvgIcon-root"]': {
                fontSize: '2rem',
                color: 'black'
            },
        }
    }),
);


export interface SelectionsListProps {
    upgrades: upgradeInterface[]
    products: productInterface[],
    basePackageField: string;
    upgradeField: string;
}

const SelectionsList: React.FC<SelectionsListProps> = (props) => {

    const classes = useStyles();

    //>MODAL
    //modal helpers
    // const modalRef = useRef();
    //employing `useEffect` because of stack example: https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    const { dispatch } = useContext(ModalContext);
    const openModal = (removeUpgrades, setFieldValue, newValue, stepperAction) => {
        console.log('i am openModal firing!')
        dispatch({
            type: 'OPEN_MODAL',
            payload: {
                removeUpgrades: removeUpgrades,
                setFieldValue: setFieldValue,
                newValue: newValue,
                stepperAction: stepperAction
            },
        });
    };
    // const openModal = (removeUpgrades, setFieldValue, newValue, setStep, setSpecificStep, step, newStep) => {
    //     console.log('i am openModal firing!')
    //     dispatch({
    //         type: 'OPEN_MODAL',
    //         payload: {
    //             removeUpgrades: removeUpgrades,
    //             setFieldValue: setFieldValue,
    //             newValue: newValue,
    //             setStep: setStep,
    //             setSpecificStep: setSpecificStep,
    //             step: step,
    //             newStep: newStep
    //         },
    //     });
    // };
    // useEffect(() => {
    //     openModal();
    // })


    //type error fix: https://stackoverflow.com/a/55502664/14657615
    const formikContext = useFormikContext();
    const formValues: formikSelectionList = formikContext.values;

    // console.log('formikContext.values', formValues)

    //> employ useField
    // info https://formik.org/docs/api/useField
    const [basePackageField, basePackageMeta, basePackageHelpers] = useField(props.basePackageField);
    const [upgradeField, upgradeMeta, upgradeHelpers] = useField(props.upgradeField);

    // console.log('basePackageField', basePackageField.value)
    // console.log('formValues', formValues)

    //> check for no upgrades selected
    const upgradesWereSelected = (upgradeCheckbox) => {
        if (upgradeCheckbox) {
            // console.log('upgradese were selected.');
            return true;
        } else {
            // console.log('NO UPGRADES SELECTED')
            return false;
        }
    }


    //>_________REMOVE FUNCTIONS
    //todo - note if `type==='upgrade'` is removed do nothing
    //todo - if basePackage is removed, check to see if its the last of its service type
    //  ACTION TO EXECUTE todo -- if it is the last of its service type, remove the service-specific upgrades
    //todo - if last basePackage overall is removed, remove any additional upgrades as well


    //>run checks before changing fieldValue
    //>isBasePackage
    const isBasePackage = (type) => {
        if (type === 'product') {
            return true
        } else {
            return false;
        }
    }
    //>isOnlyBasePackageRemaining
    const isOnlyBasePackageRemaining = (productArray) => {
        //check to see if `basePackageCheckbox` array has a length of exactly {1}
        let length = productArray.length;
        if (length === 1) {
            return true;
        } else {
            return false;
        }
        //if length === 1, then return true
        //else return false
    }

    //>isLastBaseProductOfServiceType
    const isLastBaseProductOfServiceType = (service, productArray, allSelected) => {
        //first what is the service type
        //then grab all the products in the basePackageCheckbox of that service type for comparison
        // console.log(productArray)
        let productsOfThisServiceType = [];
        productArray.map((productId) => {
            allSelected[service].map((product) => {
                if (product.productService === service) {
                    productsOfThisServiceType.push(product)
                }
            })

        });
        //then see if length is greater than 1
        if (productsOfThisServiceType.length === 1) {
            // console.log('isLastBaseProductOfServiceType...')
            return true;
        } else {
            return false;
        }
    }



    //>special upgrade removal cconditions
    const removeAllUpgrades = () => {
        //set the upgrades checkbox value to an empty array
        upgradeHelpers.setValue([]);
    }
    const removeAllUpgradesOfServiceType = (service, upgradeArray) => {
        // console.log('time to remove all upgraes of the specific service type:', service);
        //upgradeArray
    }

    const stepperContext = useContext(StepperContext)
    // console.log('i am stepperContext', stepperContext)

    const setSpecificStep = (step, newStep) => {
        return newStep
    }
    // const step = stepperContext.state.step;
    // const newStep = 1;


    //>basic remove handler
    const removeItem = (fieldName, itemId, type, service, allSelected) => {
        //first make a copy of the current array of checkboxvalues
        let newValue = [...formValues[fieldName]];
        //then remove the selected item FROM THE COPY
        newValue = newValue.filter(item => item !== itemId)
        if (isBasePackage(type)) {
            //its a base package
            if (isOnlyBasePackageRemaining(formValues[fieldName])) {
                //trigger modal window
                //info -- https://medium.com/@nugen/react-hooks-calling-child-component-function-from-parent-component-4ea249d00740
                //modalRef.current.handleOpen(removeAllUpgrades, basePackageHelpers.setValue, newValue);
                //new attempt with modal
                openModal(removeAllUpgrades, basePackageHelpers.setValue, newValue, 'GO_TO_BASE_SERVICE_SELECTION');
                // openModal(removeAllUpgrades, basePackageHelpers.setValue, newValue, stepperContext.setStep, setSpecificStep, step, newStep);
                //it's the very last base package
                //removeAllUpgrades();

                //then remove the individual product
                //basePackageHelpers.setValue(newValue);
            } else {
                // there are more base packages in the checkbox array
                if (isLastBaseProductOfServiceType(service, formValues[fieldName], allSelected)) {
                    //its the last base package of its service type
                    //so first emove all upgrades of this service type
                    removeAllUpgradesOfServiceType(service, upgradeField.value)
                    //then remove the individual product
                    basePackageHelpers.setValue(newValue);
                } else {
                    //there are other basepackages of this service type so ONLY REMOVE this individiual product
                    basePackageHelpers.setValue(newValue);
                }

            }

        } else {
            //it's an upgrade; so just remove it cuz its optional
            // console.log('type', type)
            upgradeHelpers.setValue(newValue)
        }

    }


    const { upgrades, products, ...rest } = props;
    // console.log("upgrades in confirm selection step", upgrades);

    const { basePackageCheckbox } = formValues;
    let { upgradeCheckbox } = formValues;
    // console.log("basepackagecheckbox", basePackageCheckbox);
    // console.log("upgradecheckbox", upgradeCheckbox);
    //todo - get all selected products sorted by service
    //todo - get all selected upgrades sorted by service
    //todo - create an object with each property key lining up with service category and each value being an object with the products property whcih is an array of products for the specific service and the upgrades property which is an array of upgrades for the specific service
    //todo - research how to programaticlaly remove a value from the formik.values object for `Remove` button
    //  todo -- https://stackoverflow.com/questions/56139377/how-to-add-a-clear-button-on-a-formik-textfield
    // todo - consider on `Remove` of all base products, automatically remove all upgrades associated with the base service

    //> set up array for all selections
    let selectedServices = [];
    let selectedProductsArray: any[] = [];
    let selectedUpgradesArray: any[] = [];
    //> grab all selected base package service categories
    basePackageCheckbox.map((selectedPackage) => {
        //check selectedPackage against product list to find product object
        products.map((product) => {
            if (selectedPackage === product.id) {
                //push the product service into selected Services
                selectedProductsArray.push(product);
                selectedServices.push(product.productService)
            }
        })
    })
    //> grab all selected upgrade service categories
    if (upgradesWereSelected(upgradeCheckbox)) {
        upgradeCheckbox.map((selectedUpgrade) => {
            upgrades.map((upgrade) => {
                if (selectedUpgrade === upgrade.id) {
                    selectedUpgradesArray.push(upgrade);
                    selectedServices.push(upgrade.productService)
                }
            })
        })
    }
    //>make selecteds services array be unique
    selectedServices = _.uniq(selectedServices);
    const selectedUpgrades = _.groupBy(selectedUpgradesArray, 'productService');
    const selectedProducts = _.groupBy(selectedProductsArray, 'productService');



    // console.log('SELECTEDSERVICES', selectedServices)
    // console.log('SELECTEDPRODUCTS', selectedProducts)
    // console.log('SELECTEDUPGRADES', selectedUpgrades)




    return (
        <main className="selectionsByService">
            {
                selectedServices.map((service, index) => {
                    if (service !== 'u') {
                        return <Grid component="section" key={index} container>
                            {
                                Object.keys(selectedProducts).map((key, i) => {
                                    if (key.toString() === service.toString()) {
                                        //additional return statement needed and a wrapping element needed
                                        //note: https://stackoverflow.com/a/47402440/14657615
                                        return <Grid container component="article" key={i}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography variant="h3" className={classes.selectionIcon}>{/* {getServiceData(service).name} */} {getServiceIcon(service)}</Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} component="ul" key={i} className={classes.basePackageSelection}>
                                                {
                                                    selectedProducts[key].map((product, pIndex) => {
                                                        return <Grid component="li" key={pIndex + product.id} container>
                                                            <Grid item xs={8}>
                                                                <Typography className={classes.basePackageName} align="left" variant="h5" color="primary">{product.productName}</Typography>
                                                                <Typography align="left" className={classes.selectionType}>
                                                                    BASE PACKAGE
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography align="right" className={classes.price}>${product.basePrice}.00</Typography>
                                                                <Grid container justify="flex-end">
                                                                    <Button

                                                                        onClick={() => removeItem('basePackageCheckbox', product.id, 'product', service, selectedProducts)}
                                                                    >
                                                                        <Typography align="right">
                                                                            Remove
                                                                        </Typography>
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    })
                                                }
                                                {
                                                    Object.keys(selectedUpgrades).map((upKey, upI) => {
                                                        if (upKey === service) {
                                                            return <Grid container component="ul" key={upI}>
                                                                {
                                                                    selectedUpgrades[upKey].map((upgrade) => {
                                                                        return <Grid container component="li" key={upI + upgrade.id}>
                                                                            <Grid item xs={8}>
                                                                                <Typography align="left" color="primary" className={classes.upgradeName}>
                                                                                    {upgrade.productName}
                                                                                </Typography>
                                                                                <Typography align="left" className={classes.selectionType}>
                                                                                    UPGRADE
                                                                                </Typography>
                                                                            </Grid>


                                                                            <Grid item xs={4}>
                                                                                <Typography align="right" className={classes.price}>${upgrade.basePrice}.00</Typography>
                                                                                <Grid container justify="flex-end">
                                                                                    <Button

                                                                                        onClick={() => removeItem('upgradeCheckbox', upgrade.id, 'upgrade', service, selectedUpgrades)}
                                                                                    >
                                                                                        <Typography align="right">
                                                                                            Remove
                                                                                    </Typography>
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    })
                                                                }
                                                            </Grid>
                                                        }
                                                    })
                                                }
                                            </Grid>
                                        </Grid>
                                    }
                                })
                            }
                        </Grid>
                    } else {
                        return <article key={index}>
                            <Grid container>
                                <Grid xs={12}>
                                    <Typography variant="h3" className={classes.selectionIcon}>{/* {getServiceData(service).name} */} {getServiceIcon(service)}</Typography>
                                </Grid>
                            </Grid>
                            {
                                Object.keys(selectedUpgrades).map((upKey, upI) => {
                                    if (upKey === service) {
                                        return <Grid className={classes.additionalUpgrades} container component="ul" key={upI}>
                                            {
                                                selectedUpgrades[upKey].map((upgrade) => {
                                                    return <Grid container component="li" key={upI + upgrade.id}>
                                                        <Grid item xs={8}>
                                                            <Typography align="left" color="primary" className={classes.upgradeName}>
                                                                {upgrade.productName}
                                                            </Typography>
                                                            <Typography align="left" className={classes.selectionType}>
                                                                UPGRADE
                                                                                </Typography>
                                                        </Grid>


                                                        <Grid item xs={4}>
                                                            <Typography align="right" className={classes.price}>${upgrade.basePrice}.00</Typography>
                                                            <Grid container justify="flex-end">
                                                                <Button
                                                                    onClick={() => removeItem('upgradeCheckbox', upgrade.id, 'upgrade', service, selectedUpgrades)}
                                                                >
                                                                    <Typography align="right">
                                                                        Remove
                                                                                    </Typography>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    }
                                })
                            }
                        </article>
                    }

                })
            }

        </main>
    );
}

export default SelectionsList;