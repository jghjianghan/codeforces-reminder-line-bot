const axios = require('axios').default;
const { contestToString } = require("../utils/contest");

/**
 * Fetches all upcoming contests in Codeforces and describe them in human readable string.
 * Upcoming contests are contests whose phase is BEFORE as described in the API docs
 * @param {Array} args Array of command arguments
 * @returns Promise resolving a human-readable string describing all upcoming contests
 */
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
                    contests.push(contestToString(contest))
                }
                if (contests.length == 0) {
                    return "No upcoming contests!";
                } else {
                    contests.reverse();
                    return contests.join("\n===============\n");
                }
            } else {
                return data.comment;
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