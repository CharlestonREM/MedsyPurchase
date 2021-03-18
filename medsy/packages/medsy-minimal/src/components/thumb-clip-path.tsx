import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export interface ThumbClipPathProps {
    background: string;
    backgroundSize: string;
}

const useStyles = makeStyles<Theme, ThumbClipPathProps>(theme => ({
    clipped: {
        clipPath: 'url(#blob)',
        height: '100px',
        width: '100px',
        background: ({ background }) => background,
        backgroundSize: ({ backgroundSize }) => backgroundSize,
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
        <div>
            <svg height="0" width="0" >
                <clipPath id="blob">
                    <path d="M 0 0 V -175 H 335 A 1 1 0 0 1 335 0 Z Z" transform="translate(0 270)" />
                </clipPath>
            </svg>

            <div className={classes.clipped}>
            </div>

        </div>
    );
}

export default ThumbClipPath;