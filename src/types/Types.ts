export type Player = {
    name: string;
    isReady?: boolean;
};

export type Team = {
    teamName?: string;
    playerOne?: Player | null;
    playerTwo?: Player | null;
};

export type Game = {
    id?: string;
    inProgress: boolean;
    dateTime: number;
    teamOne?: Team;
    teamTwo?: Team;
};

export const exampleGame: Game = {
    inProgress: false,
    dateTime: Date.now(),
    teamOne: {
        teamName: 'janusze',
        playerOne: {
            isReady: false,
            name: 'januszA'
        },
        playerTwo: {
            isReady: false,
            name: 'januszB'
        }
    },
    teamTwo: {
        teamName: 'grazyny',
        playerOne: {
            isReady: false,
            name: 'gazA'
        },
        playerTwo: {
            isReady: false,
            name: 'gazB'
        }
    }
};

export const USERNAME_KEY = 'futbaal-username';
