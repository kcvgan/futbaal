export type Player = {
    name: string,
    isReady: boolean
}

export type Team = {
    teamName: string,
    playerOne: Player
    playerTwo: Player
}

export type Game = {
    inProgress: boolean,
    dateTime: number,
    teamOne: Team,
    teamTwo: Team,
}