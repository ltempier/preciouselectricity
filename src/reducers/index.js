import uuid from 'uuid'

import {ADD_DEVICE, UPD_DEVICE, RMV_DEVICE, REFRESH_MAINCHART} from "../constants/actionTypes";

import {batteryProcess} from '../tools/dataProcess';

const rootReducer = (state, action) => {
    switch (action.type) {
        case ADD_DEVICE:
            return {
                ...state,
                refreshMainChart: true,
                devices: batteryProcess(
                    [
                        {
                            id: uuid(),
                            name: '',
                            type: 1,
                            quantity: 1,
                            power: 1000,
                            data: [],
                            chartData: [{x: 11, y: 100}],
                            ...action.payload
                        },
                        ...state.devices
                    ]
                )
            };

        case RMV_DEVICE:
            return {
                ...state,
                refreshMainChart: true,
                devices: batteryProcess(
                    state.devices.filter((device) => {
                        return device.id !== action.id;
                    })
                )
            };

        case UPD_DEVICE:
            return {
                ...state,
                refreshMainChart: true,
                devices: batteryProcess(
                    state.devices.map((device) => {
                        if (device.id !== action.id)
                            return device;

                        return {
                            ...device,
                            ...action.payload
                        };
                    })
                )
            };

        case REFRESH_MAINCHART:
            return {
                ...state,
                refreshMainChart: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;