import React from 'react';
import { FC, useState } from 'react';
import { Text, Box, List } from 'grommet';

type Player = {
    name: string;
    isReady?: boolean;
}

const somePlayers: Player[] = [
    {
        name: 'Tomek',
        isReady: true
    },
    {
        name: 'Żuraw',
        isReady: true
    },
    {
        name: 'Michał',
        isReady: true
    },
    {
        name: 'Kacper',
        isReady: true
    }
]

const GamePage: FC = () => {
    const [currentPlayers, setCurrentPlayers] = useState(somePlayers);


    return (<Box justify="center" align="center" pad="small" gap="medium">
        <Text size="xlarge">Obecna rozgrywka:</Text>
        <Box direction="column">
            <Box direction="row">
                <Box></Box>
                <Box></Box>
            </Box>
            <Box direction="row">
                <Box></Box>
                <Box></Box>
            </Box>
        </Box>
    </Box>)
};

const NoPlayersMessage: FC = () => {
    return (<>
        <Text size="large" alignSelf="center" margin={{ top: '125px' }}>
            Brak chętnych
        </Text></>
    )
}

const Player: FC<{ player: Player }> = ({ player }) => {

    return (<Box width={'100%'}>
    </Box>)
}

export default GamePage;