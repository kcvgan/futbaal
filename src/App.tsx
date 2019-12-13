import React from 'react';
import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import { Grommet, Box } from 'grommet';
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
  const [isAuth, setIsAuth] = useState(true);

  return (
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
              <LoginPage />
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
