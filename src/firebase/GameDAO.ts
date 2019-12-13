import {Firebase} from "./Firebase";
import {exampleGame, Game, Player, Team} from "../types/Types";

export class GameDAO {
    private static gameRef = Firebase.firebaseApp.database().ref("/gameLobby");

    static createNewGame() {
        const ref = this.gameRef.set(exampleGame);
    }

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
        return this.gameRef.update({
            teamOne: team
        })
    }

    static setSecondTeam(team: Team): Promise<Game> {
        return this.gameRef.update({
            teamOne: team
        })
    }
}