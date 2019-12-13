import React from 'react';
import { FC, useState } from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Link } from 'react-router-dom';
import { PlayerDAO } from './firebase/PlayerDAO';
import { Player } from './types/Types';

const LoginPage: FC<{register: (name: string) => Promise<void>}> = ({register}) => {
    const [name, setName] = useState('');

    return (
        <Box
            flex={true}
            pad='medium'
            overflow='auto'
            align={"center"}
            width={{ min: '300px', max: '400px' }}
            margin={{ top: '100px' }}>
            <TextInput
                placeholder='Wpisz swoje imię'
                value={name}
                onChange={e => setName(e.target.value)}/>
                <Button
                    onClick={() => register(name)}
                    primary
                    label={'Zacznij'}
                    margin={{ top: '10px' }} />
        </Box>)
};

export default LoginPage;
