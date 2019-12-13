import React from 'react';
import { FC, useState } from 'react';
import { Text, Box, Heading } from 'grommet';

type Player = {
    name: string;
    isReady?: boolean;
}

const GREEN = 'neutral-1';
const RED = 'status-error';

const GamePage: FC = () => {
    const [currentPlayers, setCurrentPlayers] = useState([]);


    return (<Box justify="center" align="center" pad="small" gap="medium" width={{ min: '500px', max: '500px' }}>
        <Text size="xlarge">Obecna rozgrywka:</Text>
        <Box direction="column" width={{ min: '100%', max: '500px' }} height={'500px'}>

            <Box direction="row">
                <PlayerBox player={currentPlayers[0]} teamColor={GREEN}/>
                <PlayerBox player={currentPlayers[1]} teamColor={GREEN}/>
            </Box>

            <Box><Heading alignSelf="center">VS</Heading></Box>

            <Box direction="row">
                <PlayerBox teamColor={RED} />
                <PlayerBox player={currentPlayers[3]} teamColor={RED}/>
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