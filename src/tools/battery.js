export function getBatteryData(battery, sumData) {

    let batteryCapacityData = [];
    let batteryData = [];
    let sumDataWithBattery = [];
    let batteryCapacityValue = 0;
    for (let i = 0; i < 48; i++) {

        if (i > 23 && batteryCapacityValue === 0)
            break;

        const h = i > 23 ? (i - 24 ) : i;
        const sumValue = 0 + sumData[h];
        let sumValueWithBattery = sumValue;
        let batteryValue = 0;
        if (sumValue < 0) { //production > consumption
            let deltaBattery = Math.abs(sumValue);
            if ((batteryCapacityValue + deltaBattery) > battery.capacity)
                deltaBattery = battery.capacity - batteryCapacityValue;

            batteryCapacityValue += deltaBattery;
            sumValueWithBattery += deltaBattery;
            batteryValue += deltaBattery

        } else if (batteryCapacityValue > 0) {
            let batteryUse = sumValue;
            if ((batteryCapacityValue - batteryUse) < 0)
                batteryUse = batteryCapacityValue;

            batteryCapacityValue -= batteryUse;
            sumValueWithBattery -= batteryUse;
            batteryValue -= batteryUse
        }

        batteryData[h] = batteryValue;
        sumDataWithBattery[h] = sumValueWithBattery;
        batteryCapacityData[h] = batteryCapacityValue;
    }

    return {
        batteryCapacityData,
        batteryData,
        sumDataWithBattery
    }
}
