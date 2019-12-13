import React from 'react';
import { FC, useState } from 'react';
import { Box, Button, TextInput } from 'grommet';

const LoginPage: FC = () => {
    const [name, setName] = useState('');

    // return (<StyledFormContainer>
    //     <LoginFormContainer setName={setName} name={name}/>
    // </StyledFormContainer>)

    return (
    <Box flex={true} pad='medium' overflow='auto'align={"center"} width={{min: '300px', max: '400px'}} margin={{top: '100px'}}>
                    <TextInput
              placeholder='Wpisz swoje imię'
            />
        <Button primary label={'Zaloguj'} margin={{top: '10px'}}/>
    </Box>)
};

export default LoginPage;
