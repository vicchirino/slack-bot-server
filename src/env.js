
/**
 * Create a doorkeeper app in the murmur directory.
 * This will allow the app to authenticate with CA
 * 
 * Example on how create a doorkeeper app.
 * Run this command in /my-culture-amp-repo/murmur/
 * 
 * Doorkeeper::Application.create(
 *     name: 'Slack Bot',
 *     redirect_uri: `http://localhost:${port}`,
 *     scopes: 'identity profile',
 * )
 * 
 * After rutning this, you will get a response like this:
 * 
 * => #<Doorkeeper::Application _
 *  id: 5ed0429e088bf305830dc0f5,
 *  created_at: 2020-05-28 22:57:33 UTC,
 *  updated_at: 2020-05-28 22:57:33 UTC,
 *  scopes: "identity profile",
 *  name: "Slack Bot",
 *  uid: "049af6c95327a3f8c6a9e7f7adcc9d197bcaf45cad31d12ea319021e6ef24ae4",
 *  secret: "4c4239d1cddef71d80dfa639eaa04bf3a851bacde0fb5676781971aeeb20ef47",
 *  redirect_uri: "http://localhost:2000", 
 *  confidential: true>
 */
   

// This is the secret of the doorkeeper app response
const secret_doorkeeper = "4c4239d1cddef71d80dfa639eaa04bf3a851bacde0fb5676781971aeeb20ef47"

// This is the uid of the doorkeeper app response
const client_id = "049af6c95327a3f8c6a9e7f7adcc9d197bcaf45cad31d12ea319021e6ef24ae4"

// This is the id of the doorkeeper app response
const app_id = "5ed0429e088bf305830dc0f5"

// This is the redirect url of the doorkeeper app
const redirect_uri = "http://localhost:2000/authentication"
   
/**
 * This URL will open murmur and display the screen for authorize the app into CA.
 * After authorizing the redirect url will be called with the code attached.
 * This code will be used to change it for the access token. 
 * 
 * node src/env.js to log the url after creating the doorkeeper.
 */
const url = `http://localhost:3000/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`

console.log(`AUTHENTICATE URL: ${url}`)

module.exports = {
    secret_doorkeeper,
    client_id,
    app_id,
    redirect_uri
}