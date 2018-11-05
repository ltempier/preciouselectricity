import {deviceTypes} from '../constants/deviceConfigs'
import _ from 'lodash'


export function dataProcess(devices) {

    let sumData = _.fill(Array(24), 0);
    let sumDataWithoutSimulation = _.fill(Array(24), 0);
    let consumerData = _.fill(Array(24), 0);
    let producerData = _.fill(Array(24), 0);
    let batteryData = _.fill(Array(24), 0);

    for (let h = 0; h < 24; h++) {

        devices.forEach(function (device) {
            if (device.data.length === 0)
                return;

            let value = device.quantity * device.power * (device.data[h] / 100);

            switch (device.type) {
                case deviceTypes.battery:
                    batteryData[h] += value;
                    sumData[h] += value;
                    if (!device.simulation)
                        sumDataWithoutSimulation[h] += value;
                    break;

                case deviceTypes.producer:
                    producerData[h] += value;
                    sumData[h] -= value;

                    if (!device.simulation)
                        sumDataWithoutSimulation[h] -= value;

                    break;
                case deviceTypes.consumer:
                    consumerData[h] += value;
                    sumData[h] += value;
                    if (!device.simulation)
                        sumDataWithoutSimulation[h] += value;
                    break;
                default:
                    break
            }
        });
    }

    let priceWithoutSimulation = _.fill(Array(24), 0);
    let price = _.fill(Array(24), 0);
    let batteryCapacityData = _.fill(Array(24), 0);
    let buffer = 0;
    batteryData.forEach(function (value, idx) {
        batteryCapacityData[idx] = (buffer += value)
    });

    return {
        sumData,
        sumDataWithoutSimulation,
        price,
        priceWithoutSimulation,
        producerData,
        consumerData,
        batteryData,
        batteryCapacityData
    }
}


export function batteryProcess(devices) {

    let batteries = devices.filter(function (device) {
        return device.type === deviceTypes.battery
    });

    if (batteries.length === 0)
        return devices;

    batteries = batteries.map(function (battery) {

        battery.capacity = battery.power * battery.quantity;
        battery.bufferCapacity = 0;

        battery.data = _.fill(Array(24), 0);
        battery.dataCapacity = _.fill(Array(24), 0);

        return battery
    });


    const res = dataProcess(devices);

    for (let i = 0; i < 48; i++) {

        const h = i > 23 ? (i - 24 ) : i;
        const sumBufferCapacity = _.sumBy(batteries, 'bufferCapacity');

        if (i > 23 && sumBufferCapacity === 0)
            break;

        const sumValue = res.consumerData[h] - res.producerData[h];
        if (sumValue < 0) { //production > consumption
            let sumBatteryCharge = Math.abs(sumValue);

            batteries.forEach(function (battery) {
                let batteryCharge = sumBatteryCharge;
                if (battery.bufferCapacity + batteryCharge > battery.capacity)
                    batteryCharge = battery.capacity - battery.bufferCapacity;

                battery.bufferCapacity += batteryCharge;
                battery.dataCapacity[h] = battery.bufferCapacity;
                battery.data[h] = batteryCharge * 100 / battery.capacity;

                sumBatteryCharge -= batteryCharge;
            });

        } else if (sumBufferCapacity > 0) {
            let sumBatteryUse = sumValue;

            batteries.forEach(function (battery) {
                let batteryUse = sumBatteryUse;
                if (battery.bufferCapacity - batteryUse < 0)
                    batteryUse = battery.bufferCapacity;

                battery.bufferCapacity -= batteryUse;
                battery.dataCapacity[h] = battery.bufferCapacity;
                battery.data[h] = -batteryUse * 100 / (battery.capacity);

                sumBatteryUse -= batteryUse;
            });
        } else {
            //recharge battery if h in recharge_time_range
        }
    }

    return devices
}