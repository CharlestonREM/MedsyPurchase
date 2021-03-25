import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { discreteSlider } from "./radio-group-tabs-discrete-slider";

//!    ATTEMPTED FIX
// import MuiSlider, { SliderProps as MuiSliderProps } from "@material-ui/core/Slider";
// import { FieldProps } from "formik";
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// export interface SliderProps extends FieldProps, Omit<MuiSliderProps, "name" | "onChange" | "value" | "defaultValue"> { }
// export const fieldToSlider = ({
//     field,
//     form: { isSubmitting },
//     disabled = false,
//     ...props
// }: SliderProps): MuiSliderProps => {
//     return {
//         disabled: isSubmitting || disabled,
//         ...props,
//         ...field,
//         name: field.name,
//         value: field.value
//     };
// };
// export const Slider: React.ComponentType<SliderProps> = (props: SliderProps) => (
//     <MuiSlider {...fieldToSlider(props)}
//         onChange={(e, value) => props.form.setFieldValue(props.field.name, value)} />
// );
// Slider.displayName = "FormikMaterialUISlider";

//! END OF ATTEMPTED FORMIK SLIDER FIX


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //width: 300
            fontSize: '.25em',
            '& .MuiSlider-markLabel': {
                fontSize: '.4rem'
            }
        },
        margin: {
            height: theme.spacing(3)
        }
    })
);

// const marks = [
//     {
//         value: 0,
//         label: (
//             <span>
//                 Under 2,000 ft<sup>2</sup>
//             </span>
//         )
//     },
//     {
//         value: 1,
//         label: (
//             <span>
//                 2,000 - 3,499ft<sup>2</sup>
//             </span>
//         )
//     },
//     {
//         value: 2,
//         label: (
//             <span>
//                 3,500 - 4,999ft<sup>2</sup>
//             </span>
//         )
//     },
//     {
//         value: 3,
//         label: (
//             <span>
//                 5,000 - 6,499ft<sup>2</sup>
//             </span>
//         )
//     },
//     {
//         value: 4,
//         label: (
//             <span>
//                 6,500 - 7,999ft<sup>2</sup>
//             </span>
//         )
//     },
//     {
//         value: 5,
//         label: (
//             <span>
//                 8,000 - 9,499ft<sup>2</sup>
//             </span>
//         )
//     },
//     {
//         value: 6,
//         label: (
//             <span>
//                 9,500 - 10,999ft<sup>2</sup>
//             </span>
//         )
//     }
// ];

function valuetext(value: number) {
    return `${value}°C`;
}

export interface DiscreteSliderProps {
    discreteSlider: discreteSlider
}

const DiscreteSlider: React.FC<DiscreteSliderProps> = (props) => {
    const classes = useStyles();
    const { label,
        defaultValue,
        getAriaValueText,
        ariaLabelledby,
        step,
        valueLabelDisplay,
        marks,
        min,
        max } = props.discreteSlider;

    console.log('i am marks', marks);



    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-custom" gutterBottom>
                {label}
            </Typography>
            <Slider
                defaultValue={defaultValue}
                aria-labelledby={ariaLabelledby}
                step={step}
                valueLabelDisplay="on"
                marks={marks}
                min={min}
                max={max}
            />
        </div>
    );
}

export default DiscreteSlider;