const axios = require('axios').default;
const { epochToDateTimeString, secondsToDurationString } = require("../utils/date");

const handler = (args) => {
    return axios.get('https://codeforces.com/api/contest.list')
        .then((response) => {
            // handle success
            const data = response.data;
            if (data.status === "OK") {
                const contests = [];
                for (contest of data.result) {
                    if (contest.phase !== "BEFORE") {
                        break;
                    }
                    const dateTimeString = epochToDateTimeString(contest.startTimeSeconds);
                    const duration = secondsToDurationString(contest.durationSeconds);
                    const timeLeft = secondsToDurationString(-contest.relativeTimeSeconds);
                    contests.push(`${contest.name}\nTime: *${dateTimeString} GMT+7* (${timeLeft} left)\nDuration: ${duration}`)
                }
                if (contests.length == 0) {
                    return "No upcoming contests!";
                } else {
                    contests.reverse();
                    return contests.join("\n===============\n");
                }
            } else {
                console.log("Upcoming contest fetch error: ", error);
                return "Error! Please contact the developer: ";
            }
        })
        .catch((error) => {
            // handle error
            console.log("Upcoming contest fetch error: ", error);
        })
};

module.exports = {
    usage: "/next",
    description: "Lists all upcoming contests",
    handler
}