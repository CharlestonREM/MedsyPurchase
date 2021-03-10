import { INITIALIZE_AVAILABLE_PRODUCTS_STATE, REHYDRATE, REMOVE_NO_LAND_BASE_PACKAGES, REMOVE_NO_LAND_UPGRADES, RETURN_NO_LAND_PRODUCTS } from 'constants/available-products-actions'
import _ from 'lodash';

//!DEFINE HELPER FUNCTIONS FOR REDUCER ACTIONS
const removeNoLandProducts = (availableProductsList) => {
    // console.log('prodlist', availableProductsList)
    //_.reject: https://lodash.com/docs/4.17.15#reject (opposite of filter)
    const filteredProducts = _.reject(availableProductsList, { 'propertyType': 'no land' });
    return filteredProducts;
}
const returnNoLandProducts = (availableList, allList) => {
    //find the items of property type land via filter from all list
    const returnedNoLandProducts = _.filter(allList, { 'propertyType': 'no land' });
    //concatenate alllist and available list
    return _.concat(returnedNoLandProducts, availableList);
}



//! DEFINE REDUCER TO BE EXPORTED TO PROVIDER HERE
//reducer defined below
export const reducer = (state, action) => {
    switch (action.type) {
        case REHYDRATE:
            return { ...state, ...action.payload };
        case INITIALIZE_AVAILABLE_PRODUCTS_STATE:
            // console.log('i am the payload from INITIALIZEAVAILABLEPRODUCTS', action.payload)
            return {
                ...state,
                availableBasePackages: action.payload.basePackageList,
                availableUpgrades: action.payload.upgradeList,
                allBasePackages: action.payload.basePackageList,
                allUpgrades: action.payload.upgradeList
            }
        case REMOVE_NO_LAND_BASE_PACKAGES:
            // console.log('i am action payload in remmove no land base packages', action.payload)
            return {
                ...state,
                availableBasePackages: removeNoLandProducts(action.payload)
            }
        case REMOVE_NO_LAND_UPGRADES:
            // console.log('i am action payload in remmove no land upgrades', action.payload)
            return {
                ...state,
                availableUpgrades: removeNoLandProducts(action.payload)
            }
        case RETURN_NO_LAND_PRODUCTS:
            return {
                ...state,
                availableBasePackages: returnNoLandProducts(state.availableBasePackages, state.allBasePackages),
                availableUpgrades: returnNoLandProducts(state.availableUpgrades, state.allUpgrades)
            }
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}