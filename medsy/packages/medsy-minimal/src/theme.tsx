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
            display: 'block'
        }
    }

};