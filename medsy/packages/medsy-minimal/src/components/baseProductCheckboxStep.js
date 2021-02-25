import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  FormControl,
  FormHelperText,
  FormGroup,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepIcon,
} from "@material-ui/core";
//imp FORMIK
import {
  Field,
  Form,
  Formik,
  useFormikContext,
  ErrorMessage,
  FormikConfig,
  FormikValues,
  useFormik,
} from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

import CheckboxGroup from "components/formik-controls/checkbox-group";

import { getServiceIcon } from "helpers/get-service-icon";

export function BaseProductCheckboxStep(props) {
  const { values: formValues } = useFormikContext();

  const { basePackages, ...rest } = props;
  //console.log("bpcs props", basePackages);

  //figure out handlechange here

  return (
    <>
      <h1>basePackageList</h1>

      {formValues.baseServiceCheckbox.map((service, index) => {
        let specificBasePackageProducts = [];
        let basePackageOptions = [];
        basePackages.map((product) => {
          if (service === product.productService) {
            specificBasePackageProducts.push(product);
            let option = {
              key: product.productName,
              value: product.id,
            };
            basePackageOptions.push(option);
          }
        });

        return (
          <div key={index}>
            <h2>{service}</h2>
            <div>{getServiceIcon(service)}</div>
            <CheckboxGroup
              label={service}
              name="basePackageCheckbox"
              options={basePackageOptions}
            />
          </div>
        );
      })}

      {/* <ol>
                            {basePackageList.map((value, index) => {
                                return <li key={index}>{value.productName}</li>
                            })}
                        </ol> */}
    </>
  );
}

export default BaseProductCheckboxStep;
