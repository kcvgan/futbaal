import React from 'react';
import { FC } from 'react';
import { Text, Box, Heading } from 'grommet';
import { Game, Player, Team } from './types/Types';
import { JoinType } from './App';

const GREEN = 'neutral-1';
const RED = 'status-error';

const GamePage: FC<{ game: Game, joinFirstTeam: JoinType, joinSecondTeam: JoinType }> = ({ game, joinFirstTeam, joinSecondTeam }) => {

    return (<Box justify="center" align="center" pad="small" gap="medium" width={{ min: '500px', max: '500px' }}>
        <Text size="xlarge">Obecna rozgrywka:</Text>
        <Box direction="column" width={{ min: '100%', max: '500px' }} height={'500px'}>
            <TeamBox team={game.teamOne} teamColor={GREEN} joinTeam={joinFirstTeam} />

            <Box><Heading alignSelf="center">VS</Heading></Box>

            <TeamBox team={game.teamTwo} teamColor={RED} joinTeam={joinSecondTeam} />
        </Box>
    </Box>)
};

const TeamBox: FC<{ team?: Team, teamColor: string, joinTeam: JoinType }> = ({ team, teamColor, joinTeam }) => {

    return (
        <Box direction="row">
            <PlayerBox player={team?.playerOne} teamColor={teamColor} joinTeam={() => joinTeam('first')}/>
            <PlayerBox player={team?.playerTwo} teamColor={teamColor} joinTeam={() => joinTeam('second')}/>
        </Box>
    )
}

const PlayerBox: FC<{ player?: Player, teamColor?: string, joinTeam?: () => void }> = ({ player, teamColor, joinTeam }) => {

    return (<Box
        onClick={() => {
            if(!player && joinTeam) {
                joinTeam();
        }}}
        round
        height={'150px'}
        pad="medium"
        margin={'15px'}
        width={'100%'}
        align="center"
        border={{ color: player ? teamColor : 'status-unknown', size: '2px', style: player ? 'solid' : 'dashed' }}>
        {player && <Text margin="auto" size="xlarge">{player.name}</Text>}
    </Box>)
}

export default GamePage;