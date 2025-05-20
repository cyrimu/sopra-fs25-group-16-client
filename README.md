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

1. **Lobby Management**:
    - Handles lobby creation and persistence.
    - Key file: [`app/hooks/lobby/useLobbyPersist.ts`](app/hooks/lobby/useLobbyPersist.ts).
    - Manages the lobby state and ensures users can join or rejoin games seamlessly.

2. **Game Card Interaction**:
    - Manages the game card interactions, including flipping and selecting cards.
    - Key file: [`app/components/gameCard.tsx`](app/components/gameCard.tsx).
    - Ensures that the game state is updated correctly based on user interactions.

3. **Game Persistence**:
    - Ensures that the game state, including the `gameId` and `username`, is saved to and restored from `localStorage` to provide a seamless user experience across page reloads.
    - Key file: [`app/hooks/game/useGamePersist.ts`](app/hooks/game/useGamePersist.ts).
    - Features:
        - Saves the `gameId` and `username` to `localStorage` whenever they change.
        - Restores the `gameId` and `username` from `localStorage` on page reload.
        - Automatically fetches the game state if it was previously saved.

These components work together to ensure a smooth user experience. For example, the lobby management system ensures users can join or rejoin games, while the game card interaction system handles gameplay logic.
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

1. **Lobby Creation**: Users can create or join a lobby. The lobby state is persisted in `localStorage` for seamless rejoining. The rules can be accessed throughout.
2. **Lobby Configuration**: Host can configure the game settings, including the game mode (text or image), language, and player roles.
3. **Gameplay**: Players interact with game cards, which update dynamically based on the game state. A log of previous turns is also accessible. 
4. **Game End**: The game concludes with a winner announcement, and players can choose to play again or leave the lobby.
6. **Game Persistence**: The game state is saved to `localStorage`, allowing users to return to their game even after a page reload.
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
-  **Calvin Klein** - Frontend - [Profile](https://github.com/calvinkoch00)
-    **Sergi Garcia Montmany** - _Fullstack_ - [Profile](https://github.com/sgm17)
-   **Cyril Müller** - _Backend_ - [Profile](https://github.com/cyrimu)
-   **Piotr Wojtaszewski** - _Backend_ - [Profile](https://github.com/winnerpio)

**Special thanks to our Tutor Silvan for his support and guidance throughout the project.**

## License
This project is licensed under the MIT License.
