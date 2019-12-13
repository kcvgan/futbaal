import {Firebase} from "./Firebase";
import {Game, Player} from "../types/Types";

export class GameDAO {
    private static gameRef = Firebase.firebaseApp.database().ref("/games");

    static createNewGame(game: Game): Game {
        const ref = this.gameRef.push(game);
        return {...game, id: ref.key}
    }

    static setGameActive(gameKey: string) {
        this.gameRef.child(gameKey).update({
            inProgress: true
        })
    }

    static setFirstPlayer(game: Game, player: Player) {
        this.gameRef.child(game.id).update({
            teamOne: {...game.teamOne, playerOne: player}
        })
    }

    static setSecondPlayer(game: Game, player: Player) {
        this.gameRef.child(game.id).update({
            teamOne: {...game.teamOne, playerTwo: player}
        })
    }

    static setThirdPlayer(game: Game, player: Player) {
        this.gameRef.child(game.id).update({
            teamTwo: {...game.teamTwo, playerOne: player}

        })
    }

    static setFourthPlayer(game: Game, player: Player) {
        this.gameRef.child(game.id).update({
            teamTwo: {...game.teamTwo, playerTwo: player}
        })
    }
}