import * as Yup from 'yup';
export const validationSchema = {
    step1: Yup.object({
        propertyType: Yup.string().required('Required'),
        propertySize: Yup.number().min(0).required('Required')
    }),
    step2: Yup.object({
        baseServiceCheckbox: Yup.array().min(1, "There should be at least one checked option.").required('Please select at least one service.')
    }),
    step3: Yup.object({
        basePackageCheckbox: Yup.array().min(1, "There should be at least one checked option.").required('Please select at least one base package.')
    }),
    step4: {

    },
    step5: Yup.object({
        // confirmSelectionCheckbox: Yup.bool().oneOf([true], 'Please let us know that your order is right!').required('Please let us know that your order is right!')
    }),
    step6: Yup.object({
        profile: Yup.object({
            customerName: Yup.string().required('Required'),
            brokerage: Yup.string(),
            email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
            phone: Yup.string().required('Required'),
        })
    }),
    step7: Yup.object({
        property: Yup.object({
            propertyStreetAddress: Yup.string().required('Required'),
            propertyCity: Yup.string().required('Required'),
            propertyState: Yup.string().required('Required'),
            propertyZip: Yup.string().required('Required'),
            propertyOccupancy: Yup.string().ensure().required('Required'),
            propertyGateCode: Yup.string().required('Required'),
            propertyPets: Yup.string().ensure().required('Required'),
            propertyLockCode: Yup.string().required('Required'),
            propertySpecialRequests: Yup.string(),
        })
    }),
    step8: Yup.object({
        session: Yup.object({
            sessionPreferredDate: Yup.date().typeError('Please select a valid Date')/* .required('Required') */,
            sessionPreferredTime: Yup.date().typeError('Please select a valid Date')/* .required('Required') */,
            sessionAlternateDate: Yup.date().typeError('Please select a valid Date')/* .required('Required') */,
            sessionAlternateTime: Yup.date().typeError('Please select a valid Date')/* .required('Required') */,
            licenseType: Yup.string().required('Required'),
            sessionSpecialRequests: Yup.string()
        })
    })
}
