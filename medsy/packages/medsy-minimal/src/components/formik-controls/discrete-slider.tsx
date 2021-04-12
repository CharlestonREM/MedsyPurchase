import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";
import { discreteSlider } from "./radio-group-tabs-discrete-slider";
import { Formik, Form, Field, useField } from 'formik';
import { useCalculator } from 'contexts/calculator/calculator.provider'


//test for mui slider
import MuiSlider, {
    SliderProps as MuiSliderProps,
} from '@material-ui/core/Slider';
import { FieldProps } from 'formik';
import { Grid } from "@material-ui/core";
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface SliderProps
    extends FieldProps,
    Omit<MuiSliderProps, 'name' | 'onChange' | 'value' | 'defaultValue'> { }

export function fieldToSlider({
    field,
    form: { isSubmitting },
    disabled = false,
    ...props
}: SliderProps): MuiSliderProps {
    return {
        disabled: isSubmitting || disabled,
        ...props,
        ...field,
        name: field.name,
        value: field.value,
    };
}

export const Slider: React.ComponentType<SliderProps> = (
    props: SliderProps
) => (
    <MuiSlider
        {...fieldToSlider(props)}
        onChange={(e, value) => {
            console.log('onchange fired', props);
            props.form.setFieldValue(props.field.name, value);
        }}
    />
);

Slider.displayName = 'FormikMaterialUISlider';




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
        },
        heading: {
            margin: '1em 0',
            fontWeight: 700,
            color: theme.palette.primary.main,
            fontSize: '1.25rem'
        }
    })
);




export interface DiscreteSliderProps {
    discreteSlider: discreteSlider,
    squareFootageLevels: any[]
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
        max,
        name
    } = props.discreteSlider;

    // console.log('i am marks', marks);

    function valueLabelFormat(value: number) {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }
    const [propertySizeField, propertySizeMeta, propertySizeHelpers] = useField('propertySize');
    const { updatePropertySize, getSquareFootageLevels } = useCalculator();

    //testing the vercel changes



    return (
        <Grid className={classes.root} container justify="center">
            <Grid item xs={10}>
                <Typography className={classes.heading} id="discrete-slider-custom" gutterBottom>
                    {label}
                </Typography>
                {/* <Slider
                defaultValue={defaultValue}
                aria-labelledby={ariaLabelledby}
                step={step}
                valueLabelDisplay="on"
                marks={marks}
                min={min}
                max={max}
            /> */}
                <Field
                    defaultValue={defaultValue}
                    component={Slider}
                    name={name}
                    valueLabelFormat={valueLabelFormat}
                    aria-labelledby={ariaLabelledby}
                    step={step}
                    valueLabelDisplay="on"
                    marks={marks}
                    min={min}
                    max={max}
                    /* onChange={(e, v) => {
                        
                        handleSliderChange(e);
                    }} */
                    onChangeCommitted={(e, value) => {
                        updatePropertySize(value)
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default DiscreteSlider;