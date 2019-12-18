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

export function isPlayerInTeam(game?: Game, player?: Player) {
  return game?.teamOne?.playerOne?.name === player?.name
    || game?.teamOne?.playerTwo?.name === player?.name
    || game?.teamTwo?.playerOne?.name === player?.name
    || game?.teamTwo?.playerTwo?.name === player?.name
}

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
    let newGame = game;
    if (newGame?.teamOne?.playerOne?.name === player?.name && newGame?.teamOne?.playerOne) {
      newGame.teamOne.playerOne.isReady = !newGame.teamOne.playerOne.isReady;
    } else if (newGame?.teamOne?.playerTwo?.name === player?.name && newGame?.teamOne?.playerTwo) {
      newGame.teamOne.playerTwo.isReady = !newGame.teamOne.playerTwo.isReady;
    } else if (newGame?.teamTwo?.playerOne?.name === player?.name && newGame?.teamTwo?.playerOne) {
      newGame.teamTwo.playerOne.isReady = !newGame.teamTwo.playerOne.isReady;
    } else if (newGame?.teamTwo?.playerTwo?.name === player?.name && newGame?.teamTwo?.playerTwo) {
      newGame.teamTwo.playerTwo.isReady = !newGame.teamTwo.playerTwo.isReady;
    }
    GameDAO.updateGame(newGame);
  }

  const joinFirstTeam = async (
    position: 'first' | 'second'
  ): Promise<void> => {
    let firstTeam = game?.teamOne;
    if (position === 'first') {
      if (!firstTeam?.playerOne && !isPlayerInTeam(game, player)) {
        firstTeam = {
          ...firstTeam,
          playerOne: player
        }
      } else if (firstTeam?.playerOne?.name === player?.name) {
        firstTeam = {
          ...firstTeam,
          playerOne: null
        };
      }
    } else {
      if (!firstTeam?.playerTwo && !isPlayerInTeam(game, player)) {
        firstTeam = {
          ...firstTeam,
          playerTwo: player
        };
      } else if (firstTeam?.playerTwo?.name === player?.name) {
        firstTeam = {
          ...firstTeam,
          playerTwo: null
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
      if (!secondTeam?.playerOne && !isPlayerInTeam(game, player)) {
        secondTeam = {
          ...secondTeam,
          playerOne: player
        }
      } else if (secondTeam?.playerOne?.name === player?.name) {
        secondTeam = {
          ...secondTeam,
          playerOne: null
        };
      }
    } else {
      if (!secondTeam?.playerTwo && !isPlayerInTeam(game, player)) {
        secondTeam = {
          ...secondTeam,
          playerTwo: player
        };
      } else if (secondTeam?.playerTwo?.name === player?.name) {
        secondTeam = {
          ...secondTeam,
          playerTwo: null
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
