import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./text-error";

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props;
  // console.log("CheckboxGroup Component props", props);

  return (
    <div className="form-control">
      <label>{label}</label>
      <Field
        name={name}
        onChange={() => {
          console.log("change handled");
        }}
        {...rest}
      >
        {({ field }) => {
          //console.log("Field", field);
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <div>
                  <input
                    type="checkbox"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </div>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default CheckboxGroup;
