import React from 'react';
import LoginPage from './LoginPage';
import { Grommet, Box } from 'grommet';
import { Player, Game, USERNAME_KEY } from './types/Types';
import { FC, useState, useEffect } from 'react';
import GamePage from './GamePage';
import { PlayerDAO } from './firebase/PlayerDAO';
import { GameDAO } from './firebase/GameDAO';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px'
    }
  }
};

export type JoinType = (position: 'first' | 'second') => Promise<void>;

const App: FC<{ playerFromStore?: Player }> = ({ playerFromStore }) => {
  const [player, setPlayer] = useState<Player | undefined>(playerFromStore);
  const [game, setGame] = useState<Game>();

  const registerGameListener = () => {
    GameDAO.gameRef.on('value', function (snapshot: any) {
      console.log(snapshot.val());
      setGame(snapshot.val());
    });
  };

  useEffect(() => {
    registerGameListener();
    return () => {
      GameDAO.gameRef.off();
    };
  }, []);

  const login = async (name: string) => {
    const loggedPlayer: Player = await PlayerDAO.register(name);
    if (loggedPlayer) {
      setPlayer(loggedPlayer);
      window.localStorage.setItem(
        USERNAME_KEY,
        JSON.stringify(loggedPlayer)
      );
    }
  };

  const setPlayerReady = () => {
    
  }

  const joinFirstTeam = async (
    position: 'first' | 'second'
  ): Promise<void> => {
    let firstTeam = game?.teamOne;
    if (position === 'first') {
      if (!firstTeam?.playerOne) {
        firstTeam = {
          ...firstTeam,
          playerOne: player
        }
      } else if (firstTeam?.playerOne?.name === player?.name) {
        firstTeam = {
          ...firstTeam,
          playerOne: undefined
        };
      }
    } else {
      if (!firstTeam?.playerTwo) {
        firstTeam = {
          ...firstTeam,
          playerTwo: player
        };
      } else if (firstTeam?.playerTwo?.name === player?.name) {
        firstTeam = {
          ...firstTeam,
          playerTwo: undefined
        };
      }
    }

    GameDAO.setFirstTeam(firstTeam);
  };

  const joinSecondTeam = async (
    position: 'first' | 'second'
  ): Promise<void> => {
    let secondTeam = game?.teamTwo;
    if (position === 'first') {
      if (!secondTeam?.playerOne) {
        secondTeam = {
          ...secondTeam,
          playerOne: player
        }
      } else if (secondTeam?.playerOne?.name === player?.name) {
        secondTeam = {
          ...secondTeam,
          playerOne: undefined
        };
      }
    } else {
      if (!secondTeam?.playerTwo) {
        secondTeam = {
          ...secondTeam,
          playerTwo: player
        };
      } else if (secondTeam?.playerTwo?.name === player?.name) {
        secondTeam = {
          ...secondTeam,
          playerTwo: undefined
        };
      }
    }

    GameDAO.setSecondTeam(secondTeam);
  };

  return (
    <Grommet theme={theme}>
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="medium"
        gap="medium"
      >
        {player ? (
          <GamePage
            player={player}
            game={game}
            joinFirstTeam={joinFirstTeam}
            joinSecondTeam={joinSecondTeam}
            setPlayerReady={setPlayerReady}
          />
        ) : (
            <LoginPage register={login} />
          )}
      </Box>
    </Grommet>
  );
};

export default App;
