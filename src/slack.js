// Running this file will put a port listening for slack services.
// For this was testing the @slack/bolt npm module.
// All the keys need to be updated to use a slack bot app for testing.

const CLIENT_SECRET = "..."
const SIGNING_SECRET = "..."
const VERIFICATION_TOKEN = "..."
const BOT_ACCESS_TOKEN = "xoxp-.."
const BOT_USER_ACCESS_TOKEN = "xoxb-..."
const { App, LogLevel } = require("@slack/bolt");

const app = new App({
  signingSecret: SIGNING_SECRET,
  token: BOT_USER_ACCESS_TOKEN,
  logLevel: LogLevel.DEBUG
});

/* Add functionality here */

(async () => {
    // Start the app
    await app.start(process.env.PORT || 2500);
    console.log('⚡️ Bolt app is running!');
  })();
  
  // The echo command simply echoes on command
  app.command("/givefeedback", async ({command, ack, say}) => {
      // Acknowledge command request
    
      console.log("---COMMAND: ", command)
  
      ack();
    
      const messageResponse = `Feedback given to ${command.text}`
      say(messageResponse);
      console.log("Entered into the app.command for /givefeedback");
  });


