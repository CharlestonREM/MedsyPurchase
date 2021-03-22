import _ from 'lodash';
export const serviceData = {
    'p': {
        name: 'Photography',
        description: 'i am photography',
        baseService: true,
        value: 'p',
        serviceLink: {
            imgUrl: "https://i.picsum.photos/id/718/300/75.jpg?hmac=GlcH4VNKPuq4oxXG6qRjNPRDhuhsUfEgXe1j-yCXIVg",
            imgAlt: "camera maps desk"
        }
    },
    'v': {
        name: 'Videography',
        description: 'i am videography',
        baseService: true,
        value: 'v',
        serviceLink: {
            imgUrl: "https://i.picsum.photos/id/255/300/75.jpg?hmac=vGHanHDxIFJz0J1JLNgqyarh8Jl7MecyhuY4YAeR4W8",
            imgAlt: "camera maps desk"
        }

    },
    'a': {
        name: 'Aerial Services',
        description: 'i am aerial services',
        baseService: true,
        value: 'a',
        serviceLink: {
            imgUrl: "https://i.picsum.photos/id/793/300/75.jpg?hmac=rNwLIxOu2YvcpCp9qdkRmoVTlqO2yvHWHRFrzyEWZP4",
            imgAlt: "camera maps desk"
        }
    },
    'd': {
        name: '3D Services',
        description: 'i am 3D services',
        baseService: true,
        value: 'd',
        serviceLink: {
            imgUrl: "https://i.picsum.photos/id/230/300/75.jpg?hmac=HAlSKofNcefcVol21UWRBZWWqLRhonVHiNf3j4xYfBo",
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

export const getAllServices = () => {
    let allServices = [];
    _.mapKeys(serviceData, function (value, key) {
        allServices.push(key);
    });
    return allServices;
}

export const getAllBaseServices = () => {
    let allServices = getAllServices();
    let allBaseServices = [];
    _.mapKeys(serviceData, function (value, key) {
        if (value.baseService) {
            allBaseServices.push(key)
        }
    })
    return allBaseServices;
}
