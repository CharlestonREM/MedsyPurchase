import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export interface ThumbClipPathProps {
    background: string;
    backgroundSize: string;
}

const useStyles = makeStyles<Theme, ThumbClipPathProps>(theme => ({
    thumbClipWrap: {
        '&::after': {
            content: '""',
            clipPath: 'url(#blob)',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: ({ background }) => background,
            backgroundSize: ({ backgroundSize }) => backgroundSize,

        },
    },
    clipped: {
        clipPath: 'url(#blob)',
        // clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
        height: '100%',
        width: '100%',
        // margin: 0,
        // width: '100px',
        background: ({ background }) => background,
        backgroundSize: ({ backgroundSize }) => backgroundSize,
    },
    blob: {
        // transform: 'translate(0 270)',
        // transform: 'scale(0.003033 0.0116279)',
        // transformOrigin: 'top left'
    },
    path: {
        height: '100%',
        transform: 'translate(0px, 108px) scale(.7,0.64)'
    }
}));

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         clipped: {
//             clipPath: 'url(#blob)',
//             height: '600px',
//             width: '1200px',
//             background: 'no-repeat url("https://i.picsum.photos/id/222/536/354.jpg?hmac=0F40OROL8Yvsv14Vjrqvhs8J3BjAdEC8IetqdiSzdlU") center center',
//             backgroundSize: 'cover'
//         }
//     }),
// );

const ThumbClipPath: React.FC<ThumbClipPathProps> = (props) => {
    const classes = useStyles(props);
    return (
        <Grid container className={classes.thumbClipWrap}>
            <svg height="0" width="0">
                <defs>
                    <clipPath className={classes.blob} id="blob" >
                        <path className={classes.path} d="M 0 0 V -175 H 335 A 1 1 0 0 1 335 0 Z Z" />
                    </clipPath>
                </defs>
            </svg>

            <Grid item xs={12} className={classes.clipped}>

            </Grid>

        </Grid>
    );
}

export default ThumbClipPath;