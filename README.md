<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

# Tic-Tac-Toe Game Backend

## Project Overview

This repository hosts the backend service for a Tic-Tac-Toe game application, facilitating gameplay between human players and an AI bot. The backend is built with TypeScript and Nest.js, providing robust API endpoints for game interactions and player data management. MongoDB is used for data storage, with Mongoose.js for schema definitions and data interaction.

## Technologies

- **TypeScript:** Enhances code quality and understandability through static typing.
- **Nest.js:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB:** A NoSQL database for storing application data.
- **Mongoose.js:** MongoDB object modeling for Node.js, simplifying interactions with the database.
- **Docker (Optional):** For containerizing the application and ensuring consistent environments across development and production.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (LTS version)
- npm

  ```sh
  npm install npm@latest -g
  ```

- MongoDB (Local or Cloud instance)

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/danik1341/TicTacToeBackend.git
   ```

2. Navigate to the project directory

   ```sh
   cd TicTacToeBackend
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory with the following content (adjust values according to your setup):

   ```
   PORT=4000 (by defualt the port is set to 4000 if no port is given)
   DATABASE_URL=mongodb://localhost:27017/tictactoe
   ```

5. Start the development server

   ```sh
   npm run start:dev
   ```

   The server will start, typically on `http://localhost:4000`.

## API Endpoints

### Gameplay API Endpoint

- **POST** `/game/play` - Accepts user actions and returns the game status along with the AI's move.

### Saved Game Retrieval API Endpoint

- **POST** `/users/login` - Retrieves the user's data that includes current or last saved game for the authenticated user.

## AI Bot Implementation

The AI bot logic is implemented internally, with difficulty levels ranging from easy to hard. It does not rely on external AI services.

## Dockerization (Optional)

To containerize the backend service, ensure Docker is installed and running on your system. Then, follow these steps:

1. Build the Docker image

   ```sh
   docker build -t TicTacToeBackend .
   ```

2. Run the container

   ```sh
   docker run -p 4000:4000 tic-tac-toe-backend
   ```

## Contributing

I welcome contributions to improve the project. Please follow the standard fork-branch-PR workflow.

---
