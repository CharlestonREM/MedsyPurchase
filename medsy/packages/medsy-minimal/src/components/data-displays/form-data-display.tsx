import { Box, Typography } from '@material-ui/core'
export interface FormDataDisplayProps {
    values: object;
    errors: object;
}

const FormDataDisplay: React.SFC<FormDataDisplayProps> = (props) => {
    return (<Box bgcolor="#e0e0e0">
        <Typography>Formik Form and Data Values</Typography>
        <pre>{JSON.stringify(props.values, null, 2)}</pre>
        <pre>{JSON.stringify(props.errors, null, 2)}</pre>
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </Box>
    );
}

export default FormDataDisplay;