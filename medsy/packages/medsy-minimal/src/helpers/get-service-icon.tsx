import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import EventSeatOutlinedIcon from "@material-ui/icons/EventSeatOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';


export const getServiceIcon = (service) => {
    switch (service) {
        case "p":
            return <CameraAltOutlinedIcon />;
            break;
        case "v":
            return <VideocamOutlinedIcon />;
            break;
        case "a":
            return <EventSeatOutlinedIcon />;
            break;
        case "d":
            return <HomeWorkOutlinedIcon />;
            break;
        case "u":
            return <OfflineBoltIcon />;
            break;
        default:
            console.log("did not recognize service");
    }
};
