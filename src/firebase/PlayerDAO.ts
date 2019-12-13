import {Firebase} from "./Firebase";
import {Player} from "../types/Types";

export class PlayerDAO {

    static userRef = Firebase.firebaseApp.database().ref("/users")

    static writeUserData(user: Player) {
        PlayerDAO.runWhenUserNotExists(user, () => {
            PlayerDAO.userRef.push(user);
        })
    }

    static runWhenUserNotExists(user: Player, callback:() => void) {
        return PlayerDAO.userRef.on("value", (snapshot: any) => {
            if (!this.useExistsInDataset(snapshot, user)) {
                callback()
            }
        }, ((error: any) => {
            console.error(error)
        }))
    }

    private static useExistsInDataset(snapshot: any, user: Player) {
        let userExists = false;
        snapshot.forEach((child: any) => {
            if (child.val().name === user.name) {
                userExists = true;
            }
        });
        return userExists;
    }
}

