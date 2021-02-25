//! THIS IS THE MAIN CALCULATION FUNCTION WITH DISCOUNT CONDITION TABULATED
//> keep in mind that my product type definition is different from medsybp so my reduce function will have different properties accessed
//TODO - change product property keys that are currently targeted below
export const calculatorProductsTotalPrice = (products, discountCondition = null) => {
    let total = products.reduce((price, product) => {
        if (product.salePrice) {
            return price + product.salePrice * product.quantity;
        }
        return price + product.price * product.quantity;
    }, 0);
    const discount = discountCondition
        ? (total * Number(discountCondition.discountInPercent)) / 100
        : 0;

    return total - discount;
};

//! DEFINE HELPER FUNCTIONS FOR REDUCER HERE
//TODO - i need to change the helper functions referenced preceding the reducer definition
//functions for reducer go here
// cartProducts, cartProductToAdd
const addProductToCalculator = (state, action) => {
    const existingCalculatorProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
    );

    if (existingCalculatorProductIndex > -1) {
        const newState = [...state.products];
        newState[existingCalculatorProductIndex].quantity += action.payload.quantity;
        return newState;
    }
    return [...state.products, action.payload];
};

// cartProducts, cartProductToRemove
const removeProductFromCalculator = (state, action) => {
    return state.products.reduce((acc, product) => {
        if (product.id === action.payload.id) {
            const newQuantity = product.quantity - action.payload.quantity;

            return newQuantity > 0
                ? [...acc, { ...product, quantity: newQuantity }]
                : [...acc];
        }
        return [...acc, product];
    }, []);
};

const clearProductFromCalculator = (state, action) => {
    return state.products.filter((product) => product.id !== action.payload.id);
};



//! DEFINE REDUCER TO BE EXPORTED TO PROVIDER HERE
//reducer defined below
export const reducer = (state, action) => {
    switch (action.type) {
        case 'REHYDRATE':
            return { ...state, ...action.payload };
        case 'TOGGLE_CALCULATOR':
            return { ...state, isOpen: !state.isOpen };
        case 'ADD_PRODUCT':
            return { ...state, products: addProductToCalculator(state, action) };
        case 'REMOVE_PRODUCT':
            return { ...state, products: removeProductFromCalculator(state, action) };
        case 'CLEAR_PRODUCT_FROM_CALCULATOR':
            return { ...state, products: clearProductFromCalculator(state, action) };
        case 'CLEAR_CALCULATOR':
            return { ...state, products: [] };
        case 'APPLY_DISCOUNT_CONDITION':
            return { ...state, discountCondition: action.payload };
        case 'REMOVE_DISCOUNT_CONDITION':
            return { ...state, discountCondition: null };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}