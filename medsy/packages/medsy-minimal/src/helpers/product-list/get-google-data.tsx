import { stringToBoolean } from "helpers/product-list/list-interface-setup";
const setTypedArray = (sheetData, typeConfiguration) => {
    let typedArray = [];
    sheetData.map((dataBit) => {
        let typedProduct = typeConfiguration;
        typedArray.push(typedProduct);
    });
    return typedArray;
}
export async function getGoogleData() {
    if (
        !(
            process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
            process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
            process.env.GOOGLE_SPREADSHEET_ID_PRODUCT_LIST
        )
    ) {
        throw new Error(
            'GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_PRODUCT`.'
        );
    }
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_PRODUCT_LIST);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
            /\\n/gm,
            '\n'
        ),
    });
    await doc.loadInfo(); // loads document properties and worksheets


    //> get basePackageList, get upgradeList, get license, get square footage

    const basePackageListSheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    const upgradeListSheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
    const licenseSheet = doc.sheetsByIndex[4]; // or use doc.sheetsById[id]
    const squareFootageSheet = doc.sheetsByIndex[5]; // or use doc.sheetsById[id]

    // read rows in batches
    const basePackageListRows = await basePackageListSheet.getRows(); // can pass in { limit, offset }
    const upgradeListRows = await upgradeListSheet.getRows(); // can pass in { limit, offset }
    const licenseRows = await licenseSheet.getRows(); // can pass in { limit, offset }
    const squareFootageRows = await squareFootageSheet.getRows(); // can pass in { limit, offset }


    //setup empty arrays here
    const basePackageListTyped = [];
    const upgradeListTyped = [];
    const licenseTyped = [];
    const squareFootageTyped = [];


    //>BASEPACKAGE LIST
    let basePackageList = basePackageListRows?.map(
        //object destructuring the map parameters
        ({
            index,
            id,
            productName,
            propertyType,
            productService,
            squareFootBased,
            basePrice,
            discountPrice,
            primaryProduct,
            description
        }) => ({
            index,
            id,
            productName,
            propertyType,
            productService,
            squareFootBased,
            basePrice,
            discountPrice,
            primaryProduct,
            description
        })
    );

    basePackageList.map((product) => {
        let typedProduct = {
            index: parseInt(product.index),
            id: product.id,
            productName: product.productName,
            propertyType: product.propertyType,
            productService: product.productService,
            squareFootBased: stringToBoolean(product.squareFootBased),
            basePrice: parseInt(product.basePrice),
            discountPrice: parseInt(product.discountPrice),
            primaryProduct: stringToBoolean(product.primaryProduct),
            description: product.description
        }
        basePackageListTyped.push(typedProduct);
    });

    //>UPGRADE LIST
    let upgradeList = upgradeListRows?.map(
        ({
            index,
            id,
            productName,
            propertyType,
            productService,
            squareFootBased,
            basePrice,
            discountPrice,
            primaryProduct,
            description
        }) => ({
            index,
            id,
            productName,
            propertyType,
            productService,
            squareFootBased,
            basePrice,
            discountPrice,
            primaryProduct,
            description
        })
    );
    //get types sorted for each product
    upgradeList.map((product) => {
        let typedProduct = {
            index: parseInt(product.index),
            id: product.id,
            productName: product.productName,
            propertyType: product.propertyType,
            productService: product.productService,
            squareFootBased: stringToBoolean(product.squareFootBased),
            basePrice: parseInt(product.basePrice),
            discountPrice: parseInt(product.discountPrice),
            primaryProduct: stringToBoolean(product.primaryProduct),
            description: product.description
        }
        upgradeListTyped.push(typedProduct);
    })

    //>LICENSE
    let license = licenseRows?.map(
        ({
            license,
            multiplier

        }) => ({
            license,
            multiplier
        })
    );

    //get types sorted for each license
    license.map((l) => {
        let typedLicense = {
            license: l.license,
            multiplier: parseInt(l.multiplier)
        }
        licenseTyped.push(typedLicense);
    })

    //>SQUAREFOOTAGE
    let squareFootage = squareFootageRows?.map(
        ({
            level,
            adjustment,
            adjustmentPhotography,
            adjustment3d,
            sqftBrackets,

        }) => ({
            level,
            adjustment,
            adjustmentPhotography,
            adjustment3d,
            sqftBrackets,

        })
    );

    //get types sorted for each level
    squareFootage.map((level) => {
        let typedLevel = {
            level: parseInt(level.level),
            adjustment: parseInt(level.adjustment),
            adjustmentPhotography: parseInt(level.adjustmentPhotography),
            adjustment3d: parseInt(level.adjustment3d),
            sqftBrackets: level.sqftBrackets,
        }
        squareFootageTyped.push(typedLevel);
    })

    return {
        basePackageList: basePackageListTyped,
        upgradeList: upgradeListTyped,
        license: licenseTyped,
        squareFootage: squareFootageTyped
    };
}