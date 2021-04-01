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
        propertyOccupancy: null,
        propertyGateCode: '000',
        propertyPets: null,
        propertyLockCode: '555',
        propertySpecialRequests: 'i am test property special requests'
    },
    session: {
        sessionPreferredDate: null,
        sessionPreferredTime: null,
        sessionAlternateDate: null,
        sessionAlternateTime: null,
        licenseType: 'single',
        sessionSpecialRequests: ''
    }
}