import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { Box, Button, FormControlLabel, Link, Typography } from "@material-ui/core";
import { useFormikContext, useField, Field } from "formik";
import { Switch } from 'formik-material-ui'
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";
import { theme } from "../theme";

import SelectionsList from 'components/selections-list';

import SimpleModal from 'components/modal'

import _ from 'lodash';


export interface ConfirmSelectionStepProps {
    upgrades: [];
    products: [];
}


const ConfirmSelectionStep: React.FC<ConfirmSelectionStepProps> = (props) => {
    const { values: formValues } = useFormikContext();
    //> employ useField
    // info https://formik.org/docs/api/useField
    const [basePackageField, basePackageMeta, basePackageHelpers] = useField('basePackageCheckbox');
    const [upgradeField, upgradeMeta, upgradeHelpers] = useField('upgradeCheckbox');

    console.log(basePackageHelpers)

    //modal helpers
    const modalRef = useRef();

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
        console.log(productArray)
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
            console.log('isLastBaseProductOfServiceType...')
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
        console.log('time to remove all upgraes of the specific service type:', service);
        //upgradeArray
    }





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
                modalRef.current.handleOpen(removeAllUpgrades, basePackageHelpers.setValue, newValue);
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
            console.log('type', type)
            upgradeHelpers.setValue(newValue)
        }

    }


    const { upgrades, products, ...rest } = props;
    // console.log("upgrades in confirm selection step", upgrades);

    const { basePackageCheckbox, upgradeCheckbox } = formValues;
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
    let selectedProducts = [];
    let selectedUpgrades = [];
    //> grab all selected base package service categories
    basePackageCheckbox.map((selectedPackage) => {
        //check selectedPackage against product list to find product object
        products.map((product) => {
            if (selectedPackage === product.id) {
                //push the product service into selected Services
                selectedProducts.push(product);
                selectedServices.push(product.productService)
            }
        })
    })
    //> grab all selected upgrade service categories
    upgradeCheckbox.map((selectedUpgrade) => {
        upgrades.map((upgrade) => {
            if (selectedUpgrade === upgrade.id) {
                selectedUpgrades.push(upgrade);
                selectedServices.push(upgrade.productService)
            }
        })
    })
    //>make selecteds services array be unique
    selectedServices = _.uniq(selectedServices);
    selectedUpgrades = _.groupBy(selectedUpgrades, 'productService');
    selectedProducts = _.groupBy(selectedProducts, 'productService');



    // console.log('SELECTEDSERVICES', selectedServices)
    // console.log('SELECTEDPRODUCTS', selectedProducts)
    // console.log('SELECTEDUPGRADES', selectedUpgrades)





    return (<Box>
        <Link
            component="button"
            variant="body2"
            onClick={() => {

            }}
        >
            Add Products
        </Link>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
                console.info("begin navigating to base service selection step using setStep variant on stepper component");
            }}
        >
            Checkout
        </Link>
        {/* <Box bgcolor="#f08080">
            <Typography>Formik Form and Data Values</Typography>
            <pre><strong>selectedServices = </strong>{JSON.stringify(selectedServices, null, 2)}</pre>
            <pre><strong>selectedProducts = </strong>{JSON.stringify(selectedProducts, null, 2)}</pre>
            <pre><strong>selectedUpgrades = </strong>{JSON.stringify(selectedUpgrades, null, 2)}</pre>
        </Box> */}

        <SelectionsList />
        <main className="selectionsByService">
            {
                selectedServices.map((service, index) => {
                    if (service !== 'u') {
                        return <section key={index}>
                            {
                                Object.keys(selectedProducts).map((key, i) => {
                                    if (key.toString() === service.toString()) {
                                        //additional return statement needed and a wrapping element needed
                                        //note: https://stackoverflow.com/a/47402440/14657615
                                        return <article>
                                            <Typography variant="h6">{getServiceData(service).name} {getServiceIcon(service)}</Typography>
                                            <ul>
                                                {
                                                    selectedProducts[key].map((product, pIndex) => {
                                                        return <li key={pIndex + product.id}><Typography style={{ backgroundColor: theme.palette.secondary.main }} variant="h5" color="primary">{product.productName}</Typography> <div>
                                                            <div>${product.basePrice}</div>
                                                            <Button

                                                                onClick={() => removeItem('basePackageCheckbox', product.id, 'product', service, selectedProducts)}
                                                            >
                                                                Remove
                                                                            </Button>
                                                        </div><hr /></li>
                                                    })
                                                }
                                                {
                                                    Object.keys(selectedUpgrades).map((upKey, upI) => {
                                                        if (upKey === service) {
                                                            return <ul>
                                                                {
                                                                    selectedUpgrades[upKey].map((upgrade) => {
                                                                        return <li>{upgrade.productName} <div>
                                                                            <div>${upgrade.basePrice}</div>
                                                                            <Button

                                                                                onClick={() => removeItem('upgradeCheckbox', upgrade.id, 'upgrade', service, selectedUpgrades)}
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </div><hr /></li>
                                                                    })
                                                                }
                                                            </ul>
                                                        }
                                                    })
                                                }
                                            </ul>
                                        </article>
                                    }
                                })
                            }
                        </section>
                    } else {
                        return <article>
                            <Typography variant="h6">{getServiceData(service).name} {getServiceIcon(service)}</Typography>
                            {
                                Object.keys(selectedUpgrades).map((upKey, upI) => {
                                    if (upKey === service) {
                                        return <ul>
                                            {
                                                selectedUpgrades[upKey].map((upgrade) => {
                                                    return <li>{upgrade.productName} <div>
                                                        <div>${upgrade.basePrice}</div>
                                                        <Button

                                                            onClick={() => removeItem('upgradeCheckbox', upgrade.id, 'upgrade', service, selectedUpgrades)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div><hr /></li>
                                                })
                                            }
                                        </ul>
                                    }
                                })
                            }
                        </article>
                    }

                })
            }

            <Box margin={1}>
                <FormControlLabel
                    control={
                        <Field component={Switch} type="checkbox" name="confirmSelectionCheckbox" />
                    }
                    label="Looks good!"
                />
            </Box>
        </main>
        <aside>
            <div className="banner">
                Need More? Add Services Now!
            </div>
            <ul>
                {
                    Object.values(serviceData).map((value, i) => {
                        if (value.baseService === true) {
                            return <li><figure>
                                <figcaption>{getServiceIcon(value.value)} <Link>{value.name}</Link></figcaption></figure></li>
                        }
                    })
                }
            </ul>
        </aside>
        <SimpleModal ref={modalRef} startOver={() => {
            removeAllUpgrades();
            basePackageHelpers.setValue(newValue);

        }} />
    </Box>);
}

export default ConfirmSelectionStep;