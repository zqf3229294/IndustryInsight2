import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA_Qq01jVGZsKkUapBqY69JDtMGaD5RwRE",
    authDomain: "industryinsight-42a3b.firebaseapp.com",
    databaseURL: "https://industryinsight-42a3b.firebaseio.com",
    projectId: "industryinsight-42a3b",
    storageBucket: "industryinsight-42a3b.appspot.com",
    messagingSenderId: "488958617767",
    appId: "1:488958617767:web:64a0ef004e66b09d735382",
    measurementId: "G-46RE2FLM3H"
};

if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig)
}


export function addPost(text) {
    return new Promise((res, rej) => {
        firebase.firestore()
            .collection('posts')
            .add({
                request: text,
                userId: firebase.auth().currentUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()

            }).then((ref) => {
                res(ref)
                console.log("post added!")
            })
            .catch((error) => {
                rej(error)
                console.log(error)
            })
        }
    )
}

// addPost = async ({ text }) => {
//     //         return new Promise((res, rej) => {
//     //             this.firestore
//     //                 .collection("posts")
//     //                 .add({
//     //                     text,
//     //                     uid: this.uid,
//     //                     timestamp: this.timestamp
//     //                 })
//     //                 .then(ref => {
//     //                     res(ref)
//     //                 })
//     //                 .catch(error => {
//     //                     rej(error)
//     //                 });
//     //         });
//     //     };
