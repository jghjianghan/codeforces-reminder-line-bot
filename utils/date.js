const epochToDateTimeString = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString('en-GB', {
        timeZone: 'Asia/Jakarta',
        dateStyle: "medium",
        timeStyle: "short"
    })
}

const secondsToDurationString = (seconds) => {
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const days = Math.floor(seconds / secondsInDay);
    const hours = Math.floor(seconds % secondsInDay / secondsInHour);
    const minutes = Math.floor(seconds % secondsInHour / secondsInMinute);

    let str = "";

    if (days > 0) {
        str += days + " day" + (days > 1 ? "s" : "");
    }

    if (hours > 0) {
        if (days > 0)
            str += " ";

        str += hours + " hour" + (hours > 1 ? "s" : "");
    }
    if (minutes > 0) {
        if (days > 0 || hours > 0)
            str += " ";

        str += minutes + " minute" + (minutes > 1 ? "s" : "");
    }

    return str;
}

module.exports = { epochToDateTimeString, secondsToDurationString };