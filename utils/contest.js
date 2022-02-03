const { epochToDateTimeString, secondsToDurationString } = require("../utils/date");

/**
 * Convert contest data to readable string
 * @param contest Contest data from Codeforces API
 */
const contestToString = (contest) => {
    const dateTimeString = epochToDateTimeString(contest.startTimeSeconds);
    const duration = secondsToDurationString(contest.durationSeconds);

    if (contest.relativeTimeSeconds < 0) {
        const timeLeft = secondsToDurationString(-contest.relativeTimeSeconds);
        return `${contest.name}\nTime: *${dateTimeString} GMT+7* (${timeLeft} left)\nDuration: ${duration}`;
    } else if (contest.relativeTimeSeconds > 0) {
        const timeLeft = secondsToDurationString(contest.relativeTimeSeconds);
        return `${contest.name}\nTime: *${dateTimeString} GMT+7* (${timeLeft} ago)\nDuration: ${duration}`;
    } else {
        return `${contest.name}\nTime: *${dateTimeString} GMT+7* (now)\nDuration: ${duration}`;
    }
}

module.exports = { contestToString };