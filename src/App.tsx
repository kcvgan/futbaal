import React from 'react';
import LoginPage from './LoginPage';
import { Grommet, Box } from 'grommet';

const App: React.FC = () => {
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
const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

export default App;
