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
            marginBottom: '2.4em',
            fontWeight: 700,
            color: theme.palette.primary.main,
            fontSize: '1.25rem'
        },
        slider: {
            color: '#999999',
            height: '2px',
            borderRadius: '1em',
            '& .MuiSlider-rail': {
                // backgroundColor: 'green',
                height: '4em',
                opacity: .6,
                top: '2em',
                borderRadius: '2em',
                width: 'calc(100% + 2.4em)'
            },
            '& .MuiSlider-track': {
                height: '4em',
                top: '2em',
                borderRadius: '2em',
                marginLeft: '-1.8em',
                paddingRight: '2.4em',

            },
            '& .MuiSlider-markLabel': {
                display: 'none'
            },
            '& .MuiSlider-thumb': {
                color: theme.palette.primary.main,
                height: '6em',
                width: '6em',
                top: '2.4em',//perfect
                marginLeft: '-2.4em',
                border: 'solid white 1.2em',
                '& .MuiSlider-valueLabel': {
                    left: '-4em',
                    '& span': {
                        backgroundColor: theme.palette.primary.main,
                        transform: 'none',
                        borderRadius: '1em',
                        width: '9em',
                        height: '2em',
                        '& span': {
                            textAlign: 'center',
                            lineHeight: '2em',
                            fontSize: '1.2em'
                        }
                    }
                }
            }
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
        //return marks.findIndex((mark) => mark.value === value) + 1;
        let mark = marks.findIndex((mark) => mark.value === value)
        return marks[mark].label
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
                    className={classes.slider}
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