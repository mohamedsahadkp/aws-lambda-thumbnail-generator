const Slack = require('slack-node');
const webhookUri = process.env.SLACK_WEBHOOK_URL;

exports.handler = (event, context) => {
    console.log("Event: " + JSON.stringify(event));
    const message = event['Records'][0]['Sns']['Message'];
    console.log("Message: " + message);

    const slack = new Slack();
    slack.setWebhook(webhookUri);

    slack.webhook({
      channel: process.env.SLACK_CHANNEL,
      username: process.env.SLACK_USER,
      text: message
    }, function(err, response) {
      if(err) {
        console.log("Error: " + err);
      } else {
        console.log("Success: " + response);
      }
      context.done();
    });
};