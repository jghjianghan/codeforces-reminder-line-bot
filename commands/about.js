/**
 * Shows this project's description
 * @param {Array} args Array of command arguments
 * @returns Promise resolving a string describing this project
 */
const handler = (args) => "This is a LINE Chatbot that gives information about competitive programming contests in Codeforces. All data are fetched directly from Codeforces' API.\nThe project is open source and is available on https://github.com/jghjianghan/codeforces-reminder-line-bot";

module.exports = {
    usage: "/about",
    description: "Shows information about this project",
    handler
}