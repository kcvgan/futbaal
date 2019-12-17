import React from 'react';
import { FC } from 'react';
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
}> = ({
    player,
    game,
    joinFirstTeam,
    joinSecondTeam,
    // leaveFirstTeam,
    // leaveSecondTeam
}) => {
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
                            leaveTeam={leaveFirstTeam}
                        />

                        <Box>
                            <Heading alignSelf="center">VS</Heading>
                        </Box>

                        <TeamBox
                            player={player}
                            team={game.teamTwo}
                            teamColor={RED}
                            joinTeam={joinSecondTeam}
                            leaveTeam={leaveSecondTeam}
                        />
                    </Box>
                    <Button label="Gotowy" />
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
    leaveTeam: LeaveType;
}> = ({ player, team, teamColor, joinTeam, leaveTeam }) => {
    const isCurrentPlayer = (currentPlayer: Player, player?: Player) =>
        player?.name === currentPlayer.name;

    return (
        <Box direction="row">
            <PlayerBox
                leaveTeam={leaveTeam}
                currentPlayer={isCurrentPlayer(player, team?.playerOne)}
                player={team?.playerOne}
                teamColor={teamColor}
                joinTeam={() => joinTeam('first')}
            />
            <PlayerBox
                leaveTeam={leaveTeam}
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
    leaveTeam?: () => void;
}> = ({ currentPlayer = false, player, teamColor, joinTeam, leaveTeam }) => {
    return (
        <Box
            onClick={() => {
                if (currentPlayer && leaveTeam) {
                    leaveTeam();
                } else if (player && joinTeam) {
                    joinTeam();
                }
            }}
            round
            height={'150px'}
            pad="medium"
            margin={'15px'}
            width={'100%'}
            align="center"
            border={{
                color: player ? teamColor : 'status-unknown',
                size: '2px',
                style: player ? 'solid' : 'dashed'
            }}
        >
            {player && (
                <Text margin="auto" size="xlarge">
                    {player.name}
                </Text>
            )}
        </Box>
    );
};

export default GamePage;
