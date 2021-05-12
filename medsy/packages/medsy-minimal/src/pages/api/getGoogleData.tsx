import { getGoogleData } from 'helpers/product-list/get-google-data';
//-- import { sendMail } from 'helpers/nodemailer';
async function getGoogleDataForCrem(key) {
    return getGoogleData(key)
}
export default async (req, res) => {
    const { method } = req;
    if (method === 'POST') {
        console.log('beginning of method===POST condition execution block...')
        //const formikValues = req.body;
        try {
            console.log('waiting for createPostData with await')
            await getGoogleDataForCrem(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
            // await sendMail('support@redq.io', email, 'PostData Received By Medsy', {
            //   items,
            //   bill_amount,
            // });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
        return res.status(200).json({ message: `successfully added new fetchdatafromgoogle` });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
};
