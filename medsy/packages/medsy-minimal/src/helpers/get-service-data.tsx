export const serviceData = {
    'p': {
        name: 'Photography',
        description: 'i am photography',
        baseService: true,
        value: 'p'
    },
    'v': {
        name: 'Videography',
        description: 'i am videography',
        baseService: true,
        value: 'v'
    },
    'a': {
        name: 'Aerial Services',
        description: 'i am aerial services',
        baseService: true,
        value: 'a'
    },
    'd': {
        name: '3D Services',
        description: 'i am 3D services',
        baseService: true,
        value: 'd'
    },
    'u': {
        name: 'Additional Upgrades',
        description: 'i am special',
        baseService: false,
        value: 'u'
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
