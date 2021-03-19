import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash'
import ServiceLinkButton from 'components/service-link-button';
import { StepperContext, GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE } from 'contexts/stepper/stepper.provider';

import { getServiceIcon } from "helpers/get-service-icon";
import { getServiceData, serviceData, getAllServices, getAllBaseServices } from "helpers/get-service-data";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

//import calc context for reducing list links
import { useCalculator } from 'contexts/calculator/calculator.provider';



export interface ServiceLinkListProps {

}

//todo - get access to the basePackageCheckbox
//todo - ask : do i need access to the upgradeCheckbox as well to replicate based on upgrades that are showing... this seems to be overkill because of how few upgrades there are and because no upgrades exist for aerial and video


//todo - once i have the basePackageCheckbox array list, i need to run a check to see what baseServices are already represented
//todo - then i need to compare the selectedServices against all services and populate `remainingServices` with the unrepresented services
//todo - then i need to limit the render method to only `remainingServices`
//todo - set up an array called `remainingServices`
//todo - populate remainingServices by UNREPRESENTED services, i.e. services that have no basePackage selections associated with them
//todo- pass `parameter`, i.e. delimiting data via payload employed in serviceLink component with special action associated with serviceLinkButtons

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

//service-link-photo-size
//https://picsum.photos/300/75

const ServiceLinkList: React.FC<ServiceLinkListProps> = () => {
    const classes = useStyles();
    const getUnselectedServiceBasePackageLinks = () => {
        const { products } = useCalculator();
        const allBaseServices = getAllBaseServices();
        const representedServices = _.map(products, 'productService');
        return _.difference(allBaseServices, representedServices);

    }

    const unselectedServiceLinks = getUnselectedServiceBasePackageLinks();

    if (unselectedServiceLinks.length !== 0) {
        return (
            <Grid component="aside" container justify="center">
                <Grid className={classes.banner} item xs={12}>
                    <Typography> Need More? Add Services Now!</Typography>
                </Grid>
                {/* <Grid container component="ul" className={classes.serviceLinkList}>
                    {
                        Object.values(serviceData).map((value, i) => {
                            if (value.baseService === true) {
                                return <Grid container component="li" key={i}>
                                    <ServiceLinkButton text={value.name} icon={getServiceIcon(value.value)} action={GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE} payload={value.value} imgAlt="lady pointing camera at camera" imgUrl={value.serviceLink.imgUrl} />
                                </Grid>
                            }
                        })
                    }
                </Grid> */}
                <Grid container component="ul" className={classes.serviceLinkList}>
                    {
                        unselectedServiceLinks.map((service, i) => {
                            return <Grid container component="li" key={i}>
                                <ServiceLinkButton text={getServiceData(service).name} icon={getServiceIcon(service)} action={GO_TO_SERVICE_SPECIFIC_BASE_PACKAGE} payload={service} imgAlt="lady pointing camera at camera" imgUrl={getServiceData(service).serviceLink.imgUrl} />
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
        );
    } else {
        return null;
    }

}

export default ServiceLinkList;