import {Firebase} from "./Firebase";
import {User} from "../types/Types";

export class DatabaseConnector {

    static userRef = Firebase.firebaseApp.database().ref("/users")
    static counterId = Firebase.firebaseApp.database().ref("/counter")

    static writeUserData(name: User) {
        DatabaseConnector.userRef.push({
            username: name
        });
    }


}

