import React, {useEffect} from 'react';
import LoginPage from './LoginPage';
import {Grommet, Box} from 'grommet';
import {PlayerDAO} from "./firebase/PlayerDAO";
import {GameDAO} from "./firebase/GameDAO";
import {exampleGame} from "./types/Types";
import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GamePage from './GamePage';

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

        let lobby = GameDAO.getLobby().then((game) => {
            console.log(game)
        });


        GameDAO.setFirstTeam({
            playerOne:{
                name: "DUPA",
                isReady: false
            },
            playerTwo:{
                isReady:false,
                name: "UDAP2"
            },
            teamName: "aaa"
        })


        PlayerDAO.register("nieaadasaaa").then((player) => {
            console.log("player")
            console.log(player)
        }).catch((error) => {
            console.log(error)
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
              <GamePage />
            </Route>}
          </Switch>
        </Router>
      </Box>
        </Grommet>
    );
}

export default App;
