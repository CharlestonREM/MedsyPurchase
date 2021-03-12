export const serviceData = {
    'p': {
        name: 'Photography',
        description: 'i am photography',
        baseService: true,
        value: 'p',
        serviceLink: {
            imgUrl: "https://rb.gy/gshmgt",
            imgAlt: "camera maps desk"
        }
    },
    'v': {
        name: 'Videography',
        description: 'i am videography',
        baseService: true,
        value: 'v',
        serviceLink: {
            imgUrl: "https://rb.gy/bbhfps",
            imgAlt: "camera maps desk"
        }

    },
    'a': {
        name: 'Aerial Services',
        description: 'i am aerial services',
        baseService: true,
        value: 'a',
        serviceLink: {
            imgUrl: "https://www.beecreekphoto.com/images/300/San-Antonio-Skyline-BW-Pano-DR209321.jpg",
            imgAlt: "camera maps desk"
        }
    },
    'd': {
        name: '3D Services',
        description: 'i am 3D services',
        baseService: true,
        value: 'd',
        serviceLink: {
            imgUrl: "https://rb.gy/8j9hgi",
            imgAlt: "camera maps desk"
        }
    },
    'u': {
        name: 'Additional Upgrades',
        description: 'i am special',
        baseService: false,
        value: 'u',
        serviceLink: {
            imgUrl: "https://rb.gy/gshmgt",
            imgAlt: "camera maps desk"
        }
    }
}
export const getServiceData = (service) => {
    switch (service) {
        case "p":
            return serviceData['p'];
            break;
        case "v":
            return serviceData['v'];
            break;
        case "a":
            return serviceData['a'];
            break;
        case "d":
            return serviceData['d'];
            break;
        case "u":
            return serviceData['u'];
            break;
        default:
            console.log("did not recognize service");
    }
};
