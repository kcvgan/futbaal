const firebase = require('firebase')

export class Firebase {
    static firebaseConfig = {
        apiKey: "AIzaSyDrEynsNNY-C_2lBQniiXKB7zUYavD8cFk",
        authDomain: "pilkarzyki-add99.firebaseapp.com",
        databaseURL: "https://pilkarzyki-add99.firebaseio.com",
        projectId: "pilkarzyki-add99",
        storageBucket: "pilkarzyki-add99.appspot.com",
        messagingSenderId: "954505205469",
        appId: "1:954505205469:web:e51e0587ab3659d8746d34",
        measurementId: "G-JXE2L05943"
    };

    static firebaseApp = firebase.initializeApp(Firebase.firebaseConfig);

    static signIn = () => {
        Firebase.firebaseApp.auth().signInAnonymously().then(() => {
        }).catch((error: any) => {
            console.log(error)
        });
    }
}


