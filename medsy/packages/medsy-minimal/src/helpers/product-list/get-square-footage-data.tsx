export async function getSquareFootage() {
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
    const sheet = doc.sheetsByTitle['squareFootage']; // or use doc.sheetsById[id]
    // console.log(sheet)
    // read rows
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    let squareFootage = rows?.map(
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

    let typedArray = [];
    //get types sorted for each level
    squareFootage.map((level) => {
        let typedLevel = {
            level: parseInt(level.level),
            adjustment: parseInt(level.adjustment),
            adjustmentPhotography: parseInt(level.adjustmentPhotography),
            adjustment3d: parseInt(level.adjustment3d),
            sqftBrackets: level.sqftBrackets,
        }
        typedArray.push(typedLevel);
    })
    squareFootage = typedArray;
    return squareFootage;
}
