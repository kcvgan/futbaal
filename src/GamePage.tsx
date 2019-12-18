import React from 'react';
import { FC, useState, useEffect } from 'react';
import { Text, Box, Heading, Button, CheckBox } from 'grommet';
import { InProgress, Checkbox, CheckboxSelected } from 'grommet-icons';
import { Game, Player, Team } from './types/Types';
import { JoinType, isPlayerInTeam as checkIfInTeam } from './App';
import { GameDAO } from './firebase/GameDAO';

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

    const [isPlayerInTeam, setIsPlayerInTeam] = useState(true);

    useEffect(() => {
        if(checkIfInTeam(game, player)) {
                setIsPlayerInTeam(false);
            }
    }, [game])

    return (
        <Box
            justify="center"
            align="center"
            pad="small"
            gap="medium"
            width={{ min: '450px' }}
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
                    {!!(game?.teamOne?.playerOne?.isReady
            && game?.teamOne?.playerTwo?.isReady
            && game?.teamTwo?.playerOne?.isReady
            && game?.teamTwo?.playerTwo?.isReady) && <Button 
                        label="Zakończ obecną rozgrywkę" 
                        onClick={() => GameDAO.resetLobby()}/>}
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
    const isCurrentPlayer = (currentPlayer: Player, player?: Player | null) =>
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
    player?: Player | null;
    teamColor?: string;
    joinTeam?: () => void;
}> = ({ currentPlayer = false, player, teamColor, joinTeam }) => {
    return (
        <Box
            onClick={() => {
            if(joinTeam) {
                joinTeam();
            }}}
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
                <><Text margin="auto" size="xlarge">
                    {player.name}
                </Text>
                <Text margin="auto" size="large">
                    {currentPlayer ? '(Ty)' : ''}
                </Text>
                {player?.isReady ? <CheckboxSelected color={GREEN} size="medium" /> : ''}
                </>
            )}
        </Box>
    );
};

export default GamePage;
