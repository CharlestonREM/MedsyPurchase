import { Grid, Typography } from '@material-ui/core';
import ServiceLinkButton from 'components/service-link-button';

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData } from "helpers/get-service-data";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
export interface ServiceLinkListProps {

}
//setup styles for grid
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        banner: {
            backgroundColor: theme.palette.secondary.main,
            padding: '1.75em',
            '& p': {
                fontSize: '1.25em',
                textTransform: 'capitalize',
                color: 'black',
                fontWeight: 900,
                textAlign: 'center'
            }
        },
        serviceLinkList: {
            padding: 0,
            margin: 0
        }
    })
);

const ServiceLinkList: React.FC<ServiceLinkListProps> = () => {
    const classes = useStyles();
    return (
        <Grid component="aside" container justify="center">
            <h1>component</h1>
            <Grid className={classes.banner} item xs={12}>
                <Typography> Need More? Add Services Now!</Typography>
            </Grid>
            <Grid container component="ul" className={classes.serviceLinkList}>
                {
                    Object.values(serviceData).map((value, i) => {
                        if (value.baseService === true) {
                            return <Grid container component="li" key={i}>
                                <ServiceLinkButton text={value.name} icon={getServiceIcon(value.value)} action='GO_TO_SPECIFIC_STEP' payload={{ step: 1 }} imgAlt="lady pointing camera at camera" imgUrl={value.serviceLink.imgUrl} />
                            </Grid>
                        }
                    })
                }
            </Grid>
        </Grid>
    );
}

export default ServiceLinkList;