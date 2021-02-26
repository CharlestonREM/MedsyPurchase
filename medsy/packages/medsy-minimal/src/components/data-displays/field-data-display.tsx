import { Box, Typography } from '@material-ui/core'
import { useField } from 'formik';

export interface FieldDataDisplayProps {
    fieldName: string;
    color: string;
}


const FieldDataDisplay: React.FC<FieldDataDisplayProps> = (props) => {
    const [field, meta, helpers] = useField(props.fieldName);
    return (
        <Box bgcolor={props.color}>
            <Typography variant="h6">Field: {props.fieldName} Data Display</Typography>
            <pre>{JSON.stringify(field, null, 2)}</pre>
            <pre>{JSON.stringify(helpers, null, 2)}</pre>
            {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        </Box>
    );
}

export default FieldDataDisplay;