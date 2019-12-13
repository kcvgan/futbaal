import React, {useEffect} from 'react';
import LoginPage from './LoginPage';
import { Grommet, Box } from 'grommet';
import {PlayerDAO} from "./firebase/PlayerDAO";

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
    PlayerDAO.writeUserData({name: "mirek", isReady: true})
  },[])

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
