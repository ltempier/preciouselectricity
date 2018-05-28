import {ADD_DEVICE, UPD_DEVICE, RMV_DEVICE} from "../constants/actionTypes";

export const addDevice = device => ({type: ADD_DEVICE, payload: device});
export const rmvDevice = id => ({type: RMV_DEVICE, id: id});
export const updDevice = (id, device) => ({type: UPD_DEVICE, payload: device, id: id});

