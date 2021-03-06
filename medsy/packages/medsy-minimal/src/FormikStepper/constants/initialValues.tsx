export const initialValues = {
    propertyType: 'house',
    propertySize: 0,
    baseServiceCheckbox: [],
    basePackageCheckbox: [],
    upgradeCheckbox: [],
    profile: {
        customerName: 'test name',
        brokerage: 'test brokerage',
        email: 'test@testemail.com',
        phone: '555-555-5555'
    },
    property: {
        propertyStreetAddress: '1776 fake st.',
        propertyCity: ' charleston',
        propertyState: 'sc',
        propertyZip: '29455',
        propertyOccupancy: 'Vacant',
        // propertyOccupancy: null,
        propertyGateCode: '000',
        propertyPets: 'no',
        // propertyPets: null,
        propertyLockCode: '555',
        propertySpecialRequests: 'i am test property special requests'
    },
    session: {
        sessionPreferredDate: null,
        sessionPreferredTime: 'anytime_8-5',
        sessionAlternateDate: null,
        sessionAlternateTime: 'anytime_8-5',
        licenseType: 'single',
        sessionSpecialRequests: ''
    }
}