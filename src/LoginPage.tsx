import React from 'react';
import { FC, useState } from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Link } from 'react-router-dom';

const LoginPage: FC = () => {
    const [name, setName] = useState('');

    return (
    <Box flex={true} pad='medium' overflow='auto'align={"center"} width={{min: '300px', max: '400px'}} margin={{top: '100px'}}>
                    <TextInput
              placeholder='Wpisz swoje imię'
            />
        <Link to={'game'}><Button primary label={'Zaloguj'} margin={{top: '10px'}}/></Link>
    </Box>)
};

export default LoginPage;
