import React from 'react';
import LoginPage from './LoginPage';
import { Grommet, Box } from 'grommet';
import { exampleGame, Player, Game, exampleGameJoined, Team } from './types/Types';
import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import GamePage from './GamePage';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

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
  const [player, setPlayer] = useState();
  const [game, setGame] = useState();

  const login = async (name: string) => {
    const loggedPlayer: Player = await register(name);
    if (loggedPlayer) {
      const fetchedGame: Game = await getLobby();
      if (fetchedGame) {
        setGame(fetchedGame);
        setPlayer(loggedPlayer);
      }
    }
  }

  const join = async (player: Player, team: Team) => {
    const newGameState = await joinTeam(team);
    if (newGameState) {
      setGame(newGameState);
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
              (<GamePage game={game} joinTeam={join} />) 
              :(<LoginPage register={login} />)}
            </Route>
          </Switch>
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
