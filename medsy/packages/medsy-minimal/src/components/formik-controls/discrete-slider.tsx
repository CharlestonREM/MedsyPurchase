import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //width: 300
        },
        margin: {
            height: theme.spacing(3)
        }
    })
);

const marks = [
    {
        value: 0,
        label: (
            <span>
                Under 2,000 ft<sup>2</sup>
            </span>
        )
    },
    {
        value: 1,
        label: (
            <span>
                2,000 - 3,499ft<sup>2</sup>
            </span>
        )
    },
    {
        value: 2,
        label: (
            <span>
                3,500 - 4,999ft<sup>2</sup>
            </span>
        )
    },
    {
        value: 3,
        label: (
            <span>
                5,000 - 6,499ft<sup>2</sup>
            </span>
        )
    },
    {
        value: 4,
        label: (
            <span>
                6,500 - 7,999ft<sup>2</sup>
            </span>
        )
    },
    {
        value: 5,
        label: (
            <span>
                8,000 - 9,499ft<sup>2</sup>
            </span>
        )
    },
    {
        value: 6,
        label: (
            <span>
                9,500 - 10,999ft<sup>2</sup>
            </span>
        )
    }
];

function valuetext(value: number) {
    return `${value}°C`;
}

export interface DiscreteSliderProps {

}

const DiscreteSlider: React.FC<DiscreteSliderProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-custom" gutterBottom>
                Custom marks
        </Typography>
            <Slider
                defaultValue={1}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="on"
                marks={marks}
                min={0}
                max={6}
            />
        </div>
    );
}

export default DiscreteSlider;