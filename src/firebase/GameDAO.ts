import {Firebase} from "./Firebase";
import {Game, Team} from "../types/Types";

export class GameDAO {
    static gameRef = Firebase.firebaseApp.database().ref("/gameLobby");

    static async getLobby(): Promise<Game> {
        const snapshot = await this.gameRef.once('value');
        return snapshot.val();
    }

    static setGameActive(gameKey: string) {
        this.gameRef.child(gameKey).update({
            inProgress: true
        })
    }

    static setFirstTeam(team: Team): Promise<Game> {
        this.gameRef.update({
            teamOne: team
        })
        return this.getLobby()
    }

    static setSecondTeam(team: Team): Promise<Game> {
        this.gameRef.update({
            teamTwo: team
        })
        return this.getLobby()
    }

    static updateGame(game?: Game): Promise<Game> {
        this.gameRef.update({
            ...game
        })
        return this.getLobby();
    }
}