export interface formikFormValues {
    propertyType: string;
    propertySize: string;
    baseServiceCheckbox: string[];
    basePackageCheckbox: string[];
    upgradeCheckbox: string[];
    confirmSelectionCheckbox: boolean;
    customerName: string;
    brokerage?: string;
    email: string;
    phone: string;
    propertyStreetAddress: string;
    propertyCity: string;
    propertyState: string;
    propertyZip: number;
    propertyOccupancy: true,
    propertyGateCode: string;
    propertyPets: boolean;
    propertyLockCode: string;
    propertySpecialRequests: string;
    sessionPreferredDate: Date;
    sessionPreferredTime: Date;
    sessionAlternateDate: Date;
    sessionAlternateTime: Date;
    licenseType: string;
    sessionSpecialRequests: string;
}

export interface formikSelectionList {
    basePackageCheckbox?: string[];
    upgradeCheckbox?: string[];
}