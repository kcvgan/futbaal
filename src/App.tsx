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
        GameDAO.gameRef.on('value', function(snapshot: any) {
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

    const joinFirstTeam = async (
        position: 'first' | 'second'
    ): Promise<void> => {
        let firstTeam = game?.teamOne;
        if (position === 'first') {
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
        console.log(newLobby);
        if (newLobby) {
            setGame(newLobby);
        }
    };

    const joinSecondTeam = async (
        position: 'first' | 'second'
    ): Promise<void> => {
        let secondTeam = game?.teamTwo;
        if (position === 'first') {
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
        if (newLobby) {
            setGame(newLobby);
        }
    };

    const leaveSecondTeam = async (
        position: 'first' | 'second'
    ): Promise<void> => {
        let secondTeam = game?.teamTwo;
        if (position === 'first') {
            secondTeam = {
                ...secondTeam,
                playerOne: undefined
            };
        } else {
            secondTeam = {
                ...secondTeam,
                playerTwo: undefined
            };
        }

        GameDAO.setSecondTeam(secondTeam);
    };

    const leaveFirstTeam = async (
        position: 'first' | 'second'
    ): Promise<void> => {
        let firstTeam = game?.teamOne;
        if (position === 'first') {
            firstTeam = {
                ...firstTeam,
                playerOne: undefined
            };
        } else {
            firstTeam = {
                ...firstTeam,
                playerTwo: undefined
            };
        }

        GameDAO.setFirstTeam(firstTeam);
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
                        // leaveFirstTeam={leaveFirstTeam}
                        // leaveSecondTeam={leaveSecondTeam}
                    />
                ) : (
                    <LoginPage register={login} />
                )}
            </Box>
        </Grommet>
    );
};

export default App;
