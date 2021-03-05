import { INITIALIZE_AVAILABLE_PRODUCTS_STATE, REHYDRATE } from 'constants/available-products-actions'

//! DEFINE REDUCER TO BE EXPORTED TO PROVIDER HERE
//reducer defined below
export const reducer = (state, action) => {
    switch (action.type) {
        case REHYDRATE:
            return { ...state, ...action.payload };
        case INITIALIZE_AVAILABLE_PRODUCTS_STATE:
            console.log('i am the payload from INITIALIZEAVAILABLEPRODUCTS', action.payload)
            return { ...state, products: action.payload }
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}