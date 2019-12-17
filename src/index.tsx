import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { USERNAME_KEY, Player } from './types/Types';

const appInit = () => {
    const userString = window.localStorage.getItem(USERNAME_KEY);

    const playerFromStore: Player | undefined = userString
        ? (JSON.parse(userString) as Player)
        : undefined;

    return <App playerFromStore={playerFromStore} />;
};

ReactDOM.render(appInit(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
