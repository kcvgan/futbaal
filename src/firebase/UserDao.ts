import {Firebase} from "./Firebase";
import {User} from "../types/Types";

export class UserDao {

    static userRef = Firebase.firebaseApp.database().ref("/users")

    static writeUserData(user: User) {
        UserDao.runWhenUserNotExists(user, () => {
            UserDao.userRef.push({
                username: user
            });
        })
    }

    static runWhenUserNotExists(user: User, callback:() => void) {
        return UserDao.userRef.on("value", (snapshot: any) => {
            if (!this.useExistsInDataset(snapshot, user)) {
                callback()
            }
        }, ((error: any) => {
            console.error(error)
        }))
    }

    private static useExistsInDataset(snapshot: any, user: User) {
        let userExists = false;
        snapshot.forEach((child: any) => {
            if (child.val().username.name === user.name) {
                userExists = true;
            }
        });
        return userExists;
    }
}

