const express = require('express')
const app = express()
const axios = require('axios');
const { getLocalStorage } = require('./db')
const { client_id, redirect_uri, secret_doorkeeper } = require('./env')

const port = 2000

app.get('/', function (req, res) {
  res.send('Hello World')
})

// This is a mock. This will be the id from the user that gave the message 
const user_slack_id = 3

const isLogged = (user_id) => {
  const localStorage = getLocalStorage()
  const token = localStorage.getItem(user_id)
  console.log(`USER WITH ID ${user_id} AND TOKEN ${token}`)
  return !!token
}

// Get access token using the code generated 
const getAccessToken = (code) => new Promise((resolve, reject) => {
  const grant_type = "authorization_code"
  console.log("CODE: ", code)
  console.log("CLIENT_ID: ", client_id)
  console.log("REDIRECT_URL: ", redirect_uri)
  console.log("CLIENT_SECRET: ", secret_doorkeeper)
  console.log("GRANT_TYPE: ", grant_type)

  axios.post(`http://localhost:3000/oauth/token`, {
    grant_type: grant_type,
    client_id: client_id,
    code: code,
    redirect_uri: redirect_uri, 
    client_secret: secret_doorkeeper
  })
  .then(function (response) {
    if (response && response.data) {
      const access_token = response.data.access_token
      console.log("ACCESS_TOKEN", access_token)
      const token_type = response.data.token_type
      const expires_in = response.data.expires_in
      const refresh_token = response.data.refresh_token
      const created_at = response.data.created_at

      resolve(access_token)
    }
  })
  .catch(function (error) {
    reject(new Error(`${error.message}`));
  });
})

// save access token with user_id as key.
const saveInDataBase = (user, access_token) => {
  const localStorage = getLocalStorage()
  localStorage.setItem(user, access_token)
}

app.get('/authentication', async function (req, res) {
  const code = req.query.code
  if (code && typeof code  === "string") {
    const accessToken = await getAccessToken(code)
    saveInDataBase(user_slack_id, accessToken)
  }
  res.send(`HI SR, THIS IS YOUR CODE: ${code}`)
})


// This is not used yet.

app.post('/slack/events/', function (req, res) {
  if (isLogged(user_slack_id)) {
    res.send('USER LOGGED =]')
    // RETURN MESSAGE BLOCK FOR GIVE FEEDBACK
  } else {
    res.send('USER NOT LOGGED =[')
    // RETURN MESSAGE BLOCK FOR LINKING ACCOUNT
  }
})

app.post('/slack/interactive-endpoint', function (req, res) {
 // TODO 
})

app.listen(port, () => {
  console.log(`Running slack-bot-server at http://localhost:${port}`)
})


