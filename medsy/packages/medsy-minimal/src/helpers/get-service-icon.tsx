import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import EventSeatOutlinedIcon from "@material-ui/icons/EventSeatOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';


export const getServiceIcon = (service) => {
    switch (service) {
        case "p":
            console.log("photography");
            return <CameraAltOutlinedIcon />;
            break;
        case "v":
            console.log("videography");
            return <VideocamOutlinedIcon />;
            break;
        case "a":
            console.log("aerial");
            return <EventSeatOutlinedIcon />;
            break;
        case "d":
            console.log("3d");
            return <HomeWorkOutlinedIcon />;
            break;
        case "u":
            console.log("special");
            return <OfflineBoltIcon />;
            break;
        default:
            console.log("did not recognize service");
    }
};
