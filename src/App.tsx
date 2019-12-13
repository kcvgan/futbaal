import React, {useEffect} from 'react';
import LoginPage from './LoginPage';
import {Grommet, Box} from 'grommet';
import {PlayerDAO} from "./firebase/PlayerDAO";
import {GameDAO} from "./firebase/GameDAO";
import {exampleGame} from "./types/Types";
import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GamePage from './GamePage';
import { Firebase } from './firebase/Firebase';

Firebase.signIn();

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const App: FC = () => {

    useEffect(() => {
        let gameRef = GameDAO.createNewGame(exampleGame);
        console.log(gameRef)
        GameDAO.setGameActive(gameRef.id!!)
        GameDAO.setFirstPlayer(gameRef, {
            name: "DUPA",
            isReady: false
        })
    }, [])

    const [isAuth, setIsAuth] = useState(true);return (
        <Grommet theme={theme}>
            <Box
                direction="row-responsive"
                justify="center"
                align="center"
                pad="medium"
                gap="medium"
            >
                <Router>
          <Switch>
            <Route exact path="/">
              <LoginPage/>
            </Route>
            {isAuth && <Route path="/game">
              <GamePage  />
            </Route>}
          </Switch>
        </Router>
      </Box>
        </Grommet>
    );
}

export default App;
