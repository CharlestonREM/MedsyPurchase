import { Box, Link, Typography } from "@material-ui/core";
import { useFormikContext } from "formik";
import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";

import _ from 'lodash';


export interface ConfirmSelectionStepProps {
    upgrades: [];
    products: [];
}

const ConfirmSelectionStep: React.FC<ConfirmSelectionStepProps> = (props) => {
    const { values: formValues } = useFormikContext();

    const { upgrades, products, ...rest } = props;
    console.log("upgrades in confirm selection step", upgrades);

    const { basePackageCheckbox, upgradeCheckbox } = formValues;
    console.log("basepackagecheckbox", basePackageCheckbox);
    console.log("upgradecheckbox", upgradeCheckbox);
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
            if (selectedPackage === product.productName) {
                //push the product service into selected Services
                selectedProducts.push(product);
                selectedServices.push(product.productService)
            }
        })
    })
    //> grab all selected upgrade service categories
    upgradeCheckbox.map((selectedUpgrade) => {
        upgrades.map((upgrade) => {
            if (selectedUpgrade === upgrade.productName) {
                selectedUpgrades.push(upgrade);
                selectedServices.push(upgrade.productService)
            }
        })
    })
    //>make selecteds services array be unique
    selectedServices = _.uniq(selectedServices);
    selectedUpgrades = _.groupBy(selectedUpgrades, 'productService');
    selectedProducts = _.groupBy(selectedProducts, 'productService');



    console.log('SELECTEDSERVICES', selectedServices)
    console.log('SELECTEDPRODUCTS', selectedProducts)
    console.log('SELECTEDUPGRADES', selectedUpgrades)
    console.log(selectedProducts['a'][0])




    return (<Box>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
                console.info("begin navigating to base service selection step using setStep variant on stepper component");
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
                                                    selectedProducts[key].map((product) => {
                                                        return <li>{product.productName}</li>
                                                    })
                                                }
                                                {
                                                    Object.keys(selectedUpgrades).map((upKey, upI) => {
                                                        if (upKey === service) {
                                                            return <ul>
                                                                {
                                                                    selectedUpgrades[upKey].map((upgrade) => {
                                                                        return <li>{upgrade.productName}</li>
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
                                                    return <li>{upgrade.productName}</li>
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
    </Box>);
}

export default ConfirmSelectionStep;