import { Chip } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontWeight: 500,
            gridColumn: '6 / span 3',
        },
    }),
);

export interface MoreInfoAccordionButtonProps {
    onClick: Function;
}

const MoreInfoAccordionButton: React.FC<MoreInfoAccordionButtonProps> = (props) => {
    const classes = useStyles();
    return (
        <Chip className={classes.root} label="More Info" color="primary" onClick={(e) => {
            props.onClick()
        }} />
    )
        ;
}

export default MoreInfoAccordionButton;