export const deviceTypes = {
    consumer: 1,
    producer: 2,
    battery: 3
};

export const deviceTypesById = {
    1: 'consumer',
    2: 'producer',
    3: 'battery'
};

export const deviceConfigs = [
    {
        name: 'empty',
        type: deviceTypes.consumer,
        power: 1000
    },
    {
        name: 'radiateur',
        type: deviceTypes.consumer,
        power: 2000,
        chartData: [
            {
                x: 1,
                y: 100
            },
            {
                x: 2,
                y: 50
            },
            {
                x: 8,
                y: 50
            },
            {
                x: 9,
                y: 0
            },
            {
                x: 17,
                y: 0
            },
            {
                x: 18,
                y: 100
            }
        ]
    }, {
        name: 'TV',
        type: deviceTypes.consumer,
        power: 25,
        chartData: [
            {
                x: 0,
                y: 0
            },
            {
                x: 19,
                y: 0
            },
            {
                x: 20,
                y: 100
            },
            {
                x: 23,
                y: 100
            },
        ]
    }, {
        name: 'wifi',
        type: deviceTypes.consumer,
        power: 25,
        chartData: [
            {
                x: 12,
                y: 100
            }
        ]
    }, {
        name: 'battery',
        type: deviceTypes.battery,
        power: 5000
    }, {
        name: 'frigo',
        type: deviceTypes.consumer,
        power: 200,
        chartData: [
            {
                x: 12,
                y: 100
            }
        ]
    }, {
        name: 'solaire',
        type: deviceTypes.producer,
        power: 5000,
        chartData: [
            {
                x: 6,
                y: 0
            },
            {
                x: 7,
                y: 5
            },
            {
                x: 8,
                y: 50
            },
            {
                x: 9,
                y: 70
            },
            {
                x: 10,
                y: 90
            },
            {
                x: 11,
                y: 100
            },
            {
                x: 14,
                y: 100
            },
            {
                x: 15,
                y: 90
            },
            {
                x: 16,
                y: 70
            },
            {
                x: 17,
                y: 50
            },
            {
                x: 18,
                y: 5
            },
            {
                x: 20,
                y: 0
            }
        ]
    }, {
        name: 'chauffe eau',
        type: deviceTypes.consumer,
        power: 2000,
        chartData: [
            {
                x: 0,
                y: 0
            },
            {
                x: 7,
                y: 0
            },
            {
                x: 8,
                y: 100
            },
            {
                x: 11,
                y: 100
            },
            {
                x: 12,
                y: 0
            },
            {
                x: 19,
                y: 0
            },
            {
                x: 20,
                y: 100
            },
            {
                x: 23,
                y: 100
            }
        ]
    },
];