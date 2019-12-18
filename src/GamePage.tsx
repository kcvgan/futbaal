import React from 'react';
import { FC, useState, useEffect } from 'react';
import { Text, Box, Heading, Button } from 'grommet';
import { InProgress } from 'grommet-icons';
import { Game, Player, Team } from './types/Types';
import { JoinType } from './App';

const GREEN = 'neutral-1';
const RED = 'status-error';

const GamePage: FC<{
    player: Player;
    game?: Game;
    joinFirstTeam: JoinType;
    joinSecondTeam: JoinType;
    setPlayerReady: () => void
}> = ({
    player,
    game,
    joinFirstTeam,
    joinSecondTeam,
    setPlayerReady
}) => {

    const [isPlayerInTeam, setIsPlayerInTeam] = useState(false);

    useEffect(() => {
        if(game?.teamOne?.playerOne?.name === player?.name
            || game?.teamOne?.playerTwo?.name === player?.name
            || game?.teamTwo?.playerOne?.name === player?.name
            || game?.teamTwo?.playerTwo?.name === player?.name) {
                setIsPlayerInTeam(true);
            }
    }, [game])

    return (
        <Box
            justify="center"
            align="center"
            pad="small"
            gap="medium"
            width={{ max: '500px' }}
        >
            {game ? (
                <>
                    <Text size="xlarge">Obecna rozgrywka:</Text>
                    <Box
                        direction="column"
                        width={{ min: '100%', max: '500px' }}
                        height={'500px'}
                    >
                        <TeamBox
                            player={player}
                            team={game.teamOne}
                            teamColor={GREEN}
                            joinTeam={joinFirstTeam}
                        />

                        <Box>
                            <Heading alignSelf="center">VS</Heading>
                        </Box>

                        <TeamBox
                            player={player}
                            team={game.teamTwo}
                            teamColor={RED}
                            joinTeam={joinSecondTeam}
                        />
                    </Box>
                    <Button 
                        disabled={isPlayerInTeam}
                        label="Gotowy" 
                        onClick={() => setPlayerReady()}/>
                </>
            ) : (
                <Box pad="xlarge" align="center" gap="large">
                    <Text size="large">Ładuję lobby</Text>
                    <InProgress size="large" color="brand" />
                </Box>
            )}
        </Box>
    );
};

const TeamBox: FC<{
    player: Player;
    team?: Team;
    teamColor: string;
    joinTeam: JoinType;
}> = ({ player, team, teamColor, joinTeam }) => {
    const isCurrentPlayer = (currentPlayer: Player, player?: Player) =>
        player?.name === currentPlayer.name;

    return (
        <Box direction="row">
            <PlayerBox
                currentPlayer={isCurrentPlayer(player, team?.playerOne)}
                player={team?.playerOne}
                teamColor={teamColor}
                joinTeam={() => joinTeam('first')}
            />
            <PlayerBox
                currentPlayer={isCurrentPlayer(player, team?.playerTwo)}
                player={team?.playerTwo}
                teamColor={teamColor}
                joinTeam={() => joinTeam('second')}
            />
        </Box>
    );
};

const PlayerBox: FC<{
    currentPlayer: boolean;
    player?: Player;
    teamColor?: string;
    joinTeam?: () => void;
}> = ({ currentPlayer = false, player, teamColor, joinTeam }) => {
    return (
        <Box
            onClick={() => {
            if(currentPlayer && player && joinTeam) {
                joinTeam();
            }}}
            round
            height={'150px'}
            pad="medium"
            margin={'15px'}
            width={'100%'}
            align="center"
            background={{color: player?.isReady ? GREEN : 'none'}}
            border={{
                color: player ? teamColor : 'status-unknown',
                size: '2px',
                style: player ? 'solid' : 'dashed'
            }}
        >
            {player && (
                <><Text margin="auto" size="xlarge">
                    {player.name}
                </Text>
                <Text margin="auto" size="large">
                    {currentPlayer ? '(Ty)' : ''}
                </Text></>
            )}
        </Box>
    );
};

export default GamePage;
