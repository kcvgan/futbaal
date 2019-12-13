import {Firebase} from "./Firebase";
import {Player} from "../types/Types";

export class PlayerDAO {

    static userRef = Firebase.firebaseApp.database().ref("/users")

    static async register(name: string): Promise<Player> {
        const data = await this.userRef.push({
            name: name,
            isReady: false
        })
        const snapshot = await data.once('value');
        return snapshot.val()
    }


    private static existsInDataset(snapshot: any, name:string) {
        let userExists = false;
        snapshot.forEach((child: any) => {
            if (child.val().username === name) {
                userExists = true;
            }
        });
        return userExists;
    }

}

