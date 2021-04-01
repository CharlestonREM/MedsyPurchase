import { Grid } from "@material-ui/core";
import { FormikStepProps } from '../interfaces/FormikStep'

const FormikStep: React.FC<FormikStepProps> = ({ children, ...props }) => {
    return (
        <Grid container>
            {children}
        </Grid>
    );
}

export default FormikStep;