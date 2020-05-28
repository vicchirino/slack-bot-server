// Running this file will put a port listening for slack services.
// For this was testing the @slack/bolt npm module.
// All the keys need to be updated to use a slack bot app for testing.

const CLIENT_SECRET = "0a0d9a2b16b4d4c0b237e2fb4d8a9a1f"
const SIGNING_SECRET = "13b9b70cefb3e567f3ce0a6f997f42ae"
const VERIFICATION_TOKEN = "hWOo4IcKiOQgyDxiH15oNfos"
const BOT_ACCESS_TOKEN = "xoxp-1137022785718-1143964205491-1144005935411-7199645eeaf4d02b2c07339adc51b645"
const BOT_USER_ACCESS_TOKEN = "xoxb-1137022785718-1144005946899-omLGd8kuq79UFQ8TKOqwX12C"
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


