import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export interface InfoBannerProps {
    title: string;
    imgUrl: string;
}
//https://picsum.photos/360/160
//profile
//https://i.picsum.photos/id/863/360/160.jpg?hmac=FC3Eqo8ORP1E90feXuT528igkgVnnwgnsms_x5E0NFs
//session
//https://i.picsum.photos/id/435/360/160.jpg?hmac=PzauqOrwyr6Bp0a2W5Cwii7j0B7V7ntq_rnAngRCPKU
//property
//https://i.picsum.photos/id/606/360/160.jpg?hmac=zH_-xBazEvqq_zo_RSFudQQ_aAPmQ0iKvyuUX2ohwTw
//or
//https://i.picsum.photos/id/193/360/160.jpg?hmac=3ykYYtiI8xVETAcHptF3vRQUuwkjskbtvFdOenscIno

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    banner: {
        position: 'relative',
        marginBlockStart: 'unset',
        marginBlockEnd: 'unset',
        marginInlineStart: 'unset',
        marginInlineEnd: 'unset',
        minHeight: '175px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '100%',
            // background: 'rgb(6,0,113)',
            background: 'linear-gradient(180deg, rgba(6,0,113,0) 0%, rgba(19,55,96,.65) 100%)',
            position: 'absolute',
            zIndex: 10000,
            top: 0,
            left: 0,
        },
        '& figcaption': {
            minHeight: '175px'
        }

    },
    title: {
        fontWeight: 900,
        textTransform: 'capitalize',
        fontSize: '1.5em',
        color: 'white',
        zIndex: 10001,
        position: 'relative'
    }
});

const InfoBanner: React.FC<InfoBannerProps> = ({ title, imgUrl, ...rest }) => {
    const classes = useStyles();
    return (<Grid className={classes.root}>
        <figure className={classes.banner} style={{ backgroundImage: `url(${imgUrl})` }}>
            <Grid component='figcaption' container justify="center" alignItems="center">
                <Grid item>
                    <Typography className={classes.title}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        </figure>
    </Grid>);
}

export default InfoBanner;