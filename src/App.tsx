import React from 'react';
import LoginPage from './LoginPage';
import { Grommet, Box } from 'grommet';
import { exampleGame, Player, Game, exampleGameJoined, Team } from './types/Types';
import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GamePage from './GamePage';
import { PlayerDAO } from './firebase/PlayerDAO';
import { GameDAO } from './firebase/GameDAO';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

export type JoinType = (position: 'first' | 'second') => Promise<void>;

const register = async (name: string): Promise<Player> => {
  return { name: 'Kacper' }
}

const getLobby = async (): Promise<Game> => {
  return exampleGame;
}

const joinTeam = async (team: Team): Promise<Game> => {
  return exampleGameJoined;
}

const App: FC = () => {
  const [player, setPlayer] = useState<Player>();
  const [game, setGame] = useState<Game>();

  const login = async (name: string) => {
    const loggedPlayer: Player = await PlayerDAO.register(name);
    if (loggedPlayer) {
      const fetchedGame: Game = await GameDAO.getLobby();
      if (fetchedGame) {
        setGame(fetchedGame);
        setPlayer(loggedPlayer);
      }
    }
  }

  const joinFirstTeam = async (position: 'first' | 'second'): Promise<void> => {
    let firstTeam = game?.teamOne;
    if(position == 'first') {
      firstTeam = {
        ...firstTeam,
        playerOne: player
      };
    } else {
      firstTeam = {
        ...firstTeam,
        playerTwo: player
      };
    }

    const newLobby = await GameDAO.setFirstTeam(firstTeam);
    if(newLobby) {
      setGame(newLobby);
    }
  }

  const joinSecondTeam = async (position: 'first' | 'second'): Promise<void> => {
    let secondTeam = game?.teamTwo;
    if(position == 'first') {
      secondTeam = {
        ...secondTeam,
        playerOne: player
      };
    } else {
      secondTeam = {
        ...secondTeam,
        playerTwo: player
      };
    }

    const newLobby = await GameDAO.setSecondTeam(secondTeam);
    if(newLobby) {
      setGame(newLobby);
    }
  }

  return (
    <Grommet theme={theme}>
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="medium"
        gap="medium"
      >
        <Router>
          <Switch>
            <Route exact path="/">
              
              {(player && game) ?
                (<GamePage game={game} joinFirstTeam={joinFirstTeam} joinSecondTeam={joinSecondTeam} />)
                : (<LoginPage register={login} />)}

            </Route>
          </Switch>
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
