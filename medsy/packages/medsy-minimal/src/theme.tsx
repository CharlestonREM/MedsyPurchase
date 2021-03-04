//theme augmentation based on issue
//https://github.com/mui-org/material-ui/issues/19427#issuecomment-597548533
import { ToggleButtonGroupClassKey } from '@material-ui/lab/ToggleButtonGroup';
declare module '@material-ui/core/styles/overrides' {
    export interface ComponentNameToClassKey {
        MuiToggleButtonGroup: ToggleButtonGroupClassKey;
    }
}

import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createMuiTheme();

// add color from project to test
theme.palette.primary.main = "#133760";
theme.palette.secondary.main = "rgb(217, 197, 102)";
const black = "#333333";
const transWhite = 'rgba(255, 255, 255, 0.5)';
theme.overrides = {
    MuiChip: {
        root: {
            // padding: '1em'
        },
        icon: {
            height: '100%',
            borderRight: 'solid 1px white',
            borderRightColor: theme.palette.secondary.main
        }
    },
    MuiToggleButtonGroup: {
        root: {
            //display: 'block'
        }
    },
    MuiStepper: {
        root: {
            backgroundColor: theme.palette.secondary.main,
            '& [class*="MuiSvgIcon-root"]': {
            }
        },


    },
    MuiStepIcon: {
        root: {
            color: 'transparent',
            '& circle': {
                stroke: transWhite,
                strokeWidth: '2',
                r: '11'
                //border: '1px solid black'
            },
            // '&$completed': {
            //     color: 'none',
            // },
            '&$active': {
                color: 'none',
                '& circle': {
                    stroke: black,
                    strokeWidth: '2',
                    r: '11'
                    //border: '1px solid black'
                },
                '& text': {
                    fill: black
                }
            },
        },
        active: {},
        completed: {},
        text: {
            fill: transWhite
        }
    }


};