# Codeforces Reminder Line Bot
A Node.js web server for a Line chatbot (channel) that gives information about contests. The base template for the project is inspired by the tutorial on https://medium.com/@marfgold1/cara-membuat-line-chatbot-dengan-node-js-b53276fadf8

# Background
## Purpose
I (an inexperienced develoder) made this project in order to challenge my understanding after following a Node.js tutorial playlist in Youtube. At first, I intended the chatbot to be able to automatically send a reminder to all the group that the bot belonged in, as well as to all its followers. The reminder will be **actively** sent in the morning on each day where there are Codeforces contests on that day. As additional features, I also wanted the chatbot to be able to **reactively** respond to user queries such as asking for information about upcoming contests or user rating changes.

## Problems
I started working on the additional features first as they are easier. But as the time comes to do the main feature, I faced several chaining problems:
- Line only provide API to broadcast to all following users (users that have added the channel as their friend), but not to the groups and multichats that it belonged into. So, the channel needs to send the messages one by one to all groups.
- Line doesn't have have endpoint to retrieve the list of groups and multichat that the channel belonged in. But the Line platform does post an event each time the channel joins and leaves a chat room. So to deal with this, the server need to keep track of the groups and multichats by itself.
- I was deploying the server to Heroku (as it's free). But Heroku is a serverless and autoscales, thus the server cannot store persistent data by itself. To store data, I need to use a Heroku add-on. Heroku does have a free database add-on called JawsDB MySQL, but to use it I need to give my credit card info. I tried to use my debit card, but the system couldn't verify it. At this point, I actually gave up on sending reminder to groups and multichats.
- Given the limitations so far, I should still be able to send broadcast messages directly to the channel followers. To do so, I actually found several cronjob packages in NPM, and Heroku also have scheduling task features. I'm not 100% sure about how cronjob works, but I think in order for it to work, the Heroku instance would need to be active at all times, which would incur cost later on. Heroku gives free 500 dyno hours, and if the instance is always active, then it certainly will surpassed the limit.
So there it goes. As this is just a side project to test my understanding, I don't want to spend any extra money. And given the problems I faced as listed above, I decided to gave up on the reminder feature (ironic right?). If you're kind enough to read all these and give me suggestions, you're welcomed to do so.

# Features
The chatbot will respond to several commands that starts with `/`. Here are the list of available commands:
- `/help` OR `\help <command>` : Display the syntax and description of all commands or a specific command
- `/next` : Lists all upcoming contests
- `/now` : Lists all ongoing contests
- `/past` : Lists up to 3 recently past contests
- `/rc <user-handle>` : Gets the last 5 rating change for a user given the user handle
- `/about` : Show information about this project
- `/leave` : Asks the chatbot to leave the group or multichat

# Setup
You need Node.js to run this project. After the repository is cloned, initialize the project with NPM:
```
npm init
```
The entrypoint of the app is app.js, so you can run the project with:
```
node app
```
or
```
npm start
```

# Sample Interaction
![CFBot-demo sideway](https://user-images.githubusercontent.com/47552445/152628815-e88fde91-6275-4457-add3-ced6159fdc7a.jpg)
