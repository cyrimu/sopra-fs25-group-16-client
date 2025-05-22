# Codenames-Client

## Introduction

Codenames is a game where opposing teams (red/blue) compete to describe their team’s words. There is a 5x5 grid of tiles with a word on each. Each team has one spymaster who gives a clue to help their teammates guess the right words. They can only use one word as a descriptor, and the number of tiles it refers to. For example, “Water, 3” might describe “pool”, “fish”, “bucket”. The aim of the game is to be the first team to guess all of your tiles.

The aim of this project is to digitalize the analog game and make it available to be played on the web. The possibilities of a online version are infinite, but it creates as well some inconveniences. As players would not be playing on the same room, it is required an input text to provide the clue and the times that the Spymaster thinks that a word is repeated. Moreover, it is possible that the players in the same room do not speak the same language. Therefore, we have designed a translation system.

Additionally, one complain that regular players complain about is that at a certain point the words start to become familiar. To enhance the players experience, we have added as well another version which instead of words, images are generated each time and displayed.

## Technologies Used

- **TypeScript**: For type-safe development.
- **React**: For building the user interface.
- **Redux**: For state management.
- **Ant Design Icons**: For UI components.
- **Framer Motion**: For animations.
- **npm**: For dependency management.

## High-Level Components

1. **Lobby Feature**:
    - Handles the lobby state using Redux, including idle, pending, and succeeded states — critical for handling async HTTP requests.
    - The initial state is fetched via:
      - POST /lobby - when a user creates a lobby.
      - POST /join - when a user joins an existing lobby.
    - Subsequent state updates are handled in real-time via WebSockets.
    - Key file: [`app/websockets/wsLobbyClient.ts`](app/websockets/wsLobbyClient.ts).
    - The feature includes:
      - Custom middleware for WebSocket communication.
      - Dispatching updated lobby states received from the server.

2. **Game Feature**:
    - Manages the game state using the same async flow (idle, pending, succeeded) and middleware logic.
    - The initial game state is fetched via:
      - POST /game
      - GET /game
    - Real-time updates to the game state are handled via WebSocket messages.
    - Key file: [`app/websockets/wsGameClient.ts`](app/websockets/wsGameClient.ts).
    - Middleware ensures the game state remains synchronized across clients.

3. **Flags Feature**:
    - Handle real-time system-level events via special WebSocket messages:
      - "deleteLobby" - Kicks all players out if the host deletes the lobby.
      - "startGame" - Sends the gameId to all players so they can fetch and enter the game.
      - "returnLobby" - Signals that the host has returned to the lobby from the results screen.
      - "saveGame" - Instructs all players to return to the lobby after a game is saved.
    - These flags are decoupled from the main game/lobby state and are managed via a lightweight Redux feature slice.

4. **Game Card Interaction**:
    - Manages the game card interactions, including flipping and selecting cards.
    - Key file: [`app/components/gameCard.tsx`](app/components/gameCard.tsx).
    - Ensures that the game state is updated correctly based on user interactions.

5. **Game Turn Managment**:
    - Manages the turn of the game deciding on each state which component display.
    - Key file: [`app/components/ActionElement.tsx`](app/components/ActionElement.tsx).
    - Ensures that as the turn changes, a different component is displayed depending on their role.

## Architecture & Design Philosophy
We follow the Single Responsibility Principle from the SOLID principles — keeping each file focused and predictable.
- Pages contain no business logic; they simply render data from the Redux store.
- WebSocket connections for both lobby and game are managed independently, and each dispatches updates that overwrite their respective slices.
- When a user joins a new lobby or enters a different game, they are automatically disconnected from the previous WebSocket and connected to the new one.
- This ensures the entire state management layer is screen-independent. Any page can render the current data no matter where the user is — and always stay in sync.

## Launch & Deployment

### Prerequisites

- Install Node.js and npm.
- Clone the repository:
```bash
git clone https://github.com/cyrimu/sopra-fs25-group-16-client.git
```

### Installing Dependencies

Run the following command to install all required dependencies:
```bash
npm install
```

### Running the Application Locally

Start the development server:
```bash
npm start
```

### Running Tests

Run the automated tests:
```bash
npm test
```

### Deployment
#### External Dependencies
 - This server will deploy to Vercel to run, therefore the Vercel Services need to be running.
 - The GitHub actions need the connected Secrets to be present in order for deployment to succeed.
 - For Source code control Sonarcloud needs to be running and working
   
#### Steps to deploy
This project uses CI/CD using github actions and will automatically deploy to the Google Cloud and all other external dependencies on each commit. Therefore no additional actions need to be performed.

#### Modify Deployment
 - To add additional processes modify the [github actions file](https://github.com/cyrimu/sopra-fs25-group-16-server/tree/main/.github/workflows)

## Illustrations

### Main User Flow

1. **Lobby Creation**: Users can create or join a lobby and share its ID with friends so they can join.
2. **Lobby Configuration**: Host can configure the game settings, including the game mode (text or image), language, and player roles.
3. **Gameplay**: Players interact with game cards, which update dynamically based on the game state. A log of previous turns is also accessible. 
4. **Game End**: The game concludes with a winner announcement, and players can choose to play again or leave the lobby.
6. **Game Persistence**: The game state is saved to `localStorage`, allowing users to return to their game even after a page reload. The library redux-persist has been configured for this purpose.
#### Screenshots

- **Lobby Screen**:
  ![Lobby Screen](lobby_screen.png)

- **Game Setup**:
  ![Config Panel](configuration_panel.png)

- **Game Screen**:
  ![Game Screen](game_screen.png)

## Roadmap

1. **Support for Different Player Counts**: Allow games to be played with a configurable number of players, not limited to 4.
2. **Chat Functionality**: Add an in-game chat feature for players to communicate during gameplay.
3. **Viewer Mode**: Introduce a spectator mode where users can watch ongoing games without participating.

## Authors and Acknowledgment

-  **Rashmi Dingdur** - _Frontend_ - [Profile](https://github.com/rashmidindgur)
-  **Calvin Koch** - Frontend - [Profile](https://github.com/calvinkoch00)
-    **Sergi Garcia Montmany** - _Fullstack_ - [Profile](https://github.com/sgm17)
-   **Cyril Müller** - _Backend_ - [Profile](https://github.com/cyrimu)
-   **Piotr Wojtaszewski** - _Backend_ - [Profile](https://github.com/winnerpio)

**Special thanks to our Tutor Silvan for his support and guidance throughout the project.**

## License
This project is licensed under the MIT License.
