import {ADD_DEVICE, UPD_DEVICE, RMV_DEVICE, UPD_BATTERY} from "../constants/actionTypes";
import uuid from 'uuid'

const rootReducer = (state, action) => {
    switch (action.type) {
        case ADD_DEVICE:
            return {
                ...state,
                devices: [{
                    id: uuid(),
                    name: '',
                    type: 1,
                    quantity: 1,
                    power: 1000,
                    data: [],
                    chartData: [{x: 11, y: 100}],
                    ...action.payload
                }, ...state.devices]
            };

        case RMV_DEVICE:
            return {
                ...state,
                devices: state.devices.filter((device) => {
                    return device.id !== action.id;
                })
            };

        case UPD_DEVICE:
            return {
                ...state,
                devices: state.devices.map((device) => {
                    if (device.id !== action.id)
                        return device;

                    return {
                        ...device,
                        ...action.payload
                    };
                })
            };

        case UPD_BATTERY:
            return {
                ...state,
                battery: {
                    ...state.battery,
                    ...action.payload
                }
            };

        default:
            return state;
    }
};

export default rootReducer;