const axios = require('axios').default;
const { contestToString } = require("../utils/contest");

/**
 * Fetches all ongoing contests in Codeforces and describe them in human readable string.
 * Ongoing contests are contests whose phase is BEFORE as described in the API docs
 * @param {Array} args Array of command arguments
 * @returns Promise resolving human-readable string describing the current ongoing contests
 */
const handler = (args) => {
    return axios.get('https://codeforces.com/api/contest.list')
        .then((response) => {
            // handle success
            const data = response.data;
            const contests = [];
            for (contest of data.result) {
                if (contest.phase === "FINISHED") {
                    break;
                } else if (contest.phase === "CODING") {
                    contests.push(contestToString(contest))
                }
            }
            if (contests.length == 0) {
                return "No ongoing contests!";
            } else {
                contests.reverse();
                return contests.join("\n===============\n");
            }
        })
        .catch((error) => {
            // handle error
            console.log("Ongoing contest fetch error: ", error);
            return "Error: " + error.response.data.comment;
        })
};

module.exports = {
    usage: "/now",
    description: "Lists all ongoing contests",
    handler
}