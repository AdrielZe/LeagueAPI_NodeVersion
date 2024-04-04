### League of Legends Summoner API

This Node.js application utilizes the Riot Games API to fetch information about League of Legends summoners, including summoner details, champion masteries, and total mastery points.

#### Setup

Before running the application, make sure you have Node.js installed on your system. You'll also need to obtain API keys from Riot Games to access their API.

1. Clone this repository to your local machine.
2. Install Axios, Express and Nodemon dependencies by running `npm i axios`, `npm i express` and `npm i nodemon`.
3. Obtain Riot Games API keys and place them in the `apikey.js` file.
4. Run the application using `node app.js`.

#### Endpoints

- **GET /getSummonerInfos/:name**

  Fetches information about a summoner by their in-game name.

- **GET /getSummonerMasteries/:puuid**

  Retrieves the champion masteries for a summoner by their encrypted PUUID.

- **GET /getSummonerTotalMastery/:name**

  Retrieves the total mastery points of a summoner by their in-game name.

#### Usage

Make GET requests to the specified endpoints to retrieve the desired information about League of Legends summoners.

#### Dependencies

- Express.js: Web framework for handling HTTP requests.
- Axios: Promise-based HTTP client for making requests to the Riot Games API.
- Nodemon: Use Nodemon to restart your project automatically when you make changes.

#### Example

```bash
curl http://localhost:8080/getSummonerInfos/{summoner_name}

Disclaimer: This application is for educational purposes only and should comply with Riot Games' API policies and terms of use.

For more information about the Riot Games API, refer to the official documentation.

```
