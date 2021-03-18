import { Chip } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontWeight: 500,
            gridColumn: '6 / span 3',
            '&::after': {
                //content string trick: https://stackoverflow.com/a/43361653/14657615
                // content: '""',
                // display: 'block',
                // position: 'absolute',
            }
        },
    }),
);

export interface MoreInfoAccordionButtonProps {
    onClick: Function;
    productName?: string;
}

const MoreInfoAccordionButton: React.FC<MoreInfoAccordionButtonProps> = (props) => {
    const classes = useStyles();
    return (
        <Chip className={classes.root} label="More Info" color="primary" onClick={(e) => {
            console.log('i am e dude', e)
            props.onClick()
        }} />
    )
        ;
}

export default MoreInfoAccordionButton;