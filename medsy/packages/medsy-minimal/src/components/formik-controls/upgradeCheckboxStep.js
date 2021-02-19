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
import { lime } from "@material-ui/core/colors";

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData } from "helpers/get-service-data";

export function UpgradeCheckboxStep(props) {
  const { values: formValues } = useFormikContext();

  const { upgrades, products, ...rest } = props;
  console.log("upgrades step props", upgrades);

  const { basePackageCheckbox } = formValues;
  console.log("basepackagecheckbox", basePackageCheckbox);

  //> get available upgrades
  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  const checkedUpgrades = [];
  const upgradeCheckboxOptions = [];

  basePackageCheckbox.map((selectedProductId) => {
    products.map((product) => {
      if (selectedProductId === product.id) {
        upgrades.map((upgrade) => {
          if (
            (upgrade.productService === product.productService) |
            (upgrade.productService === "u")
          ) {
            checkedUpgrades.push(upgrade);
          }
        });
      }
    });
  });
  const availableUpgrades = checkedUpgrades.filter(
    (v, i, a) => a.indexOf(v) === i
  );

  const sortedUpgrades = groupBy(availableUpgrades, "productService");

  Object.entries(sortedUpgrades).forEach(([key, value]) => {
    console.log("value dude", value);
    console.log("key dude", key);
    sortedUpgrades[key].checkboxOptions = [];
    value.map((upgrade) => {
      let option = {
        key: upgrade.productName,
        value: upgrade.id,
      };
      sortedUpgrades[key].checkboxOptions.push(option);
    });
  });

  // sortedUpgrades.map((serviceGroup) => {
  //   serviceGroup.checkboxOptions = [];
  //   serviceGroup.map((upgrade) => {
  //     let option = {
  //       key: upgrade.productName,
  //       value: upgrade.productName,
  //     };
  //     serviceGroup.checkboxOptions.push(option);
  //   });
  // });
  console.log("I AM AVAILABLE UPGRADES", availableUpgrades);
  console.log("I AM UPGRADE OPTIONS", upgradeCheckboxOptions);
  console.log("I AM SORTED BY SERVICES", sortedUpgrades);

  return (
    <>
      <h1>available upgrades</h1>
      {Object.keys(sortedUpgrades).map((key, i) => {
        return (
          <div key={i}>
            <h4>
              {getServiceData(key).name} {getServiceIcon(key)}
            </h4>
            <CheckboxGroup
              label="Choose from these available upgrade options"
              name="upgradeCheckbox"
              options={sortedUpgrades[key].checkboxOptions}
            />
          </div>
        );
      })}

      {/* instead of looping through services, we need to loop thru upgrades */}
      {/* <div>
        {basePackageCheckbox.map((product) => {
          {
            upgrades.map((item) => {
              return <div>{item.index}</div>;
            });
          }
          return <div>{product}</div>;
        })}
      </div>

      {formValues.baseServiceCheckbox.map((service, index) => {
        let availableUpgrades = [];
        let upgradeOptions = [];
        upgrades.map((upgrade) => {
          if (
            (service === upgrade.productService) |
            (upgrade.productService === "u")
          ) {
            availableUpgrades.push(upgrade);
            let option = {
              key: upgrade.productName,
              value: upgrade.productName,
            };
            upgradeOptions.push(option);
          }
        });

        return (
          <div key={index}>
            <h2>Available Upgrades {service}</h2>
            <CheckboxGroup
              label="Choose from these available upgrade options"
              name="upgradeCheckbox"
              options={upgradeOptions}
            />
          </div>
        );
      })} */}

      {/* <ol>
                            {basePackageList.map((value, index) => {
                                return <li key={index}>{value.productName}</li>
                            })}
                        </ol> */}
    </>
  );
}

export default UpgradeCheckboxStep;
