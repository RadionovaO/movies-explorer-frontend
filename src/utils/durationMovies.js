export function durationMin(min) {
    let time = `${min % 60} мин.`
    if (time === '0 мин.') {
        return ``
    }
    return time;
};

export function durationHour(hour) {
    let time = `${Math.floor(hour/60)} ч.`
    if (time === '0 ч.') {
        return ``
    }
    return time;
};