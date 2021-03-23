import { stringToBoolean } from "helpers/product-list/list-interface-setup";
export async function getBasePackageList() {
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
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  let basePackageList = rows?.map(
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

  let typedArray = [];
  //get types sorted for each product
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
    typedArray.push(typedProduct);
  })
  basePackageList = typedArray;
  return basePackageList;
}
