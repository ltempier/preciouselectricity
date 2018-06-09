import _ from "lodash";

function fixHour(hour) {
    while (hour > 24)
        hour -= 24;
    while (hour < 0)
        hour += 24;
    return hour
}

export function formatHour(hour) {
    hour = fixHour(hour);
    return (hour > 9 ? '' : '0') + hour //+ ':00'
}

export function formatHourInterval(hour) {
    hour = fixHour(hour);
    let nextHour = fixHour(hour + 1);
    return [formatHour(hour), formatHour(nextHour)].join('-')
}

export function stringFormatLargeNumber(number, precision) {

    const options = [
        {
            max: 1000000000,
            prefix: 'T'
        },
        {
            max: 1000000,
            prefix: 'M'
        },
        {
            max: 1000,
            prefix: 'k'
        }
    ];

    let str = `${_.round(number, precision)} `;
    options.some(function (option) {
        if (Math.abs(number) >= option.max) {
            str = `${_.round(number / option.max, precision)} ${option.prefix}`;
            return true
        }
        return false
    });
    return str
}