import React from 'react';
import { FC, useState } from 'react';
import { Text, Box, Heading } from 'grommet';
import { Game, Player } from './types/Types';

const GREEN = 'neutral-1';
const RED = 'status-error';

const GamePage: FC<{game: Game}> = ({game}) => {

    return (<Box justify="center" align="center" pad="small" gap="medium" width={{ min: '500px', max: '500px' }}>
        <Text size="xlarge">Obecna rozgrywka:</Text>
        <Box direction="column" width={{ min: '100%', max: '500px' }} height={'500px'}>

            <Box direction="row">
                <PlayerBox player={game.teamOne.playerOne} teamColor={GREEN}/>
                <PlayerBox player={game.teamOne.playerTwo} teamColor={GREEN}/>
            </Box>

            <Box><Heading alignSelf="center">VS</Heading></Box>

            <Box direction="row">
                <PlayerBox player={game.teamTwo.playerOne} teamColor={RED} />
                <PlayerBox player={game.teamTwo.playerTwo} teamColor={RED}/>
            </Box>

        </Box>
    </Box>)
};

const PlayerBox: FC<{ player?: Player, teamColor?: string, joinTeam?: () => void }> = ({ player, teamColor, joinTeam }) => {

    return (<Box
        onClick={joinTeam}
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