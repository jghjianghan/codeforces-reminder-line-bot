const axios = require('axios').default;
const { epochToDateTimeString } = require('../utils/date');

/**
 * Fetches the last 5 rating change for a Codeforces user and describe them in human readable string.
 * @param {Array} args Array of command arguments (should contain user handle as the first element)
 * @returns Promise resolving a human-readable string describing all upcoming contests
 */
const handler = (args) => {
    if (args.length < 1) {
        return "Missing user handle"
    }
    const userHandle = args[0];
    return axios.get('https://codeforces.com/api/user.rating?handle=' + userHandle)
        .then((response) => {
            // handle success
            const data = response.data;
            if (data.status === "OK") {
                const changes = data.result.slice(-5, data.result.length).map(change => {
                    const ratingChange = change.newRating - change.oldRating;
                    let ratingChangeLabel = (ratingChange >= 0 ? "+" : "") + ratingChange;
                    return `${change.contestName}\nRank ${change.rank}\n*${change.oldRating} --> ${change.newRating}* (${ratingChangeLabel})\nUpdate time: ${epochToDateTimeString(change.ratingUpdateTimeSeconds)}`
                });

                if (changes.length == 0) {
                    return "No rating change!";
                } else {
                    changes.reverse();
                    return `Rating change for ${userHandle}:\n${changes.join("\n===============\n")}`;
                }
            } else {
                return data.comment;
            }
        })
        .catch((error) => {
            // handle error
            console.log("Error on user rating change: ", error);
        })
};

module.exports = {
    usage: "/rc <user-handle>",
    description: "Gets the last 5 rating change for a user",
    handler
}