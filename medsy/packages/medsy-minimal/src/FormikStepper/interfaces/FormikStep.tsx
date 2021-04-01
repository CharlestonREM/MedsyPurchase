import { FormikConfig, FormikValues } from 'formik';
export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    stepperStep: number;
    stepTitle: string;
    fieldDataDisplay?: string;
}