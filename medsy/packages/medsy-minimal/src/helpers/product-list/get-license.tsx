export async function getLicense() {
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
    const sheet = doc.sheetsByTitle['license']; // or use doc.sheetsById[id]
    // console.log(sheet)
    // read rows
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    let license = rows?.map(
        ({
            license,
            multiplier

        }) => ({
            license,
            multiplier
        })
    );

    let typedArray = [];
    //get types sorted for each license
    license.map((l) => {
        let typedLicense = {
            license: l.license,
            multiplier: parseInt(l.multiplier)
        }
        typedArray.push(typedLicense);
    })
    license = typedArray;
    return license;
}
