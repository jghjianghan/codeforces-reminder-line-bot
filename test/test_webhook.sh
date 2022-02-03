curl -X POST \
-H 'Authorization: Bearer '"$CHANNEL_ACCESS_TOKEN" \
-H 'Content-Type:application/json' \
-d '{"endpoint":"https://cf-reminder.herokuapp.com/"}' \
https://api.line.me/v2/bot/channel/webhook/test