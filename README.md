
### Slack Bot Test

This is a little middleware for connecting a slack bot with CA
The intention of this is make a proof of concept and have something running

In this repo there are 2 parts that need to be unified in some point, still working on that.

## 1. Authentication flow

For this we need to have murmur / web-gateway / perf-api locally I use [perform-cli](https://github.com/cultureamp/perform-cli)

Behind the murmur in the rails conosole, create a doorkeeper app.

```
  Doorkeeper::Application.create(
     name: 'Slack Bot',
     redirect_uri: `http://localhost:${port}`,
     scopes: 'identity profile',
  )
```

the response will be something like: 

```
  => #<Doorkeeper::Application _
   id: 5ed0429e088bf305830dc0f5,
   created_at: 2020-05-28 22:57:33 UTC,
   updated_at: 2020-05-28 22:57:33 UTC,
   scopes: "identity profile",
   name: "Slack Bot",
   uid: "049af6c95327a3f8c6a9e7f7adcc9d197bcaf45cad31d12ea319021e6ef24ae4",
   secret: "4c4239d1cddef71d80dfa639eaa04bf3a851bacde0fb5676781971aeeb20ef47",
   redirect_uri: "http://localhost:2000", 
   confidential: true>
 
```

use those values inside `src/env.js`

run `node src/server.js` to get listening a express server.
run `node src/env.js` to get the url to authorize and open it.
You should see a code that then will be used to get the access token. 

## 2. Communication between slack and server (don't user authentication yet)

For test slack interaction with server  locally need to do some stuff:

Go to https://api.slack.com/apps for creating a bot app.
After created get all credentials: 
`Signing Secret`
`Verification Token` 
`OAuth Access Token` 
`Bot User OAuth Access Token`
`Client Secret`

• In `https://api.slack.com/apps/<my-slack-app-id>/oauth` add different scopes:

```
channels:read
chat:write
commands
groups:read
im:read
im:write
mpim:read
reminders:write
```

• In `https://api.slack.com/apps/<my-slack-app-id>/slash-commands` 
you can add some commands to the bot like `givefeedback` and need to set up a entry point URL. We need to use [ngrok](https://ngrok.com/) for testing see this --> https://slack.dev/node-slack-sdk/tutorials/local-development#what-is-a-request-URL

We use `bolt-js` npm to run this: https://github.com/slackapi/bolt-js 

• Update all credentials inside `src/slack.js`
• run `node src/slack.js` 

Now the server is up and if you type the command `/givefeedback` you should get a response from the bot.
