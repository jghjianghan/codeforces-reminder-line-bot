const axios = require('axios').default;
const { contestToString } = require("../utils/contest");

/**
 * Fetches the past 3 contests in Codeforces and describe them in human readable string.
 * Past contests are contests whose phase is either PENDING_SYSTEM_TEST, SYSTEM_TEST, or FINISHED as described in the API docs
 * @param {Array} args Array of command arguments
 * @returns Promise resolving human-readable string describing the past contests
 */
const handler = (args) => {
    return axios.get('https://codeforces.com/api/contest.list')
        .then((response) => {
            // handle success
            const data = response.data;

            const validPhases = ["PENDING_SYSTEM_TEST", "SYSTEM_TEST", "FINISHED"];
            const contests = [];
            for (contest of data.result) {
                if (validPhases.includes(contest.phase)) {
                    contests.push(contestToString(contest))
                }
                if (contests.length >= 3) //store up to 3 past contests
                    break;
            }
            if (contests.length == 0) {
                return "No past contests!";
            } else {
                return contests.join("\n===============\n");
            }
        })
        .catch((error) => {
            // handle error
            console.log("Past contest fetch error: ", error);
            console.log("Error: ", error.response.data.comment);
        })
};

module.exports = {
    usage: "/past",
    description: "Lists up to 3 recently past contests",
    handler
}