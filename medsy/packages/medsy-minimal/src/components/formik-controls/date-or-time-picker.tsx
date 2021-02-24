import { Box } from "@material-ui/core";
import { Field } from 'formik';
import { DatePicker, TimePicker } from 'formik-material-ui-pickers';


export interface DateOrTimePickerProps {
  component: string;
  name: string;
  label: string;
}

const DateOrTimePicker: React.FC<DateOrTimePickerProps> = (props) => {
  const isDate = props.component === 'DatePicker';
  return (<Box margin={1}>
    {/* https://stackoverflow.com/a/55359152/14657615 */}
    <Field
      component={isDate ? DatePicker : TimePicker}
      name={props.name}
      label={props.label} />
  </Box>);
}

export default DateOrTimePicker;