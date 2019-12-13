import React, {useEffect} from 'react';
import LoginPage from './LoginPage';
import {Grommet, Box} from 'grommet';
import {PlayerDAO} from "./firebase/PlayerDAO";
import {GameDAO} from "./firebase/GameDAO";
import {exampleGame} from "./types/Types";

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const App: React.FC = () => {

    useEffect(() => {
        let gameRef = GameDAO.createNewGame(exampleGame);
        console.log(gameRef)
        GameDAO.setGameActive(gameRef.id!!)
        GameDAO.setFirstPlayer(gameRef, {
            name: "DUPA",
            isReady: false
        })
    }, [])

    return (
        <Grommet theme={theme}>
            <Box
                direction="row-responsive"
                justify="center"
                align="center"
                pad="medium"
                gap="medium"
            >
                <LoginPage/>
            </Box>
        </Grommet>
    );
}

export default App;
