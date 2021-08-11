import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAHyxuI54fDHzWFKEun3xodgKGA3Xwmd4g",
    authDomain: "ekodecrux-website.firebaseapp.com",
    databaseURL: "https://ekodecrux-website-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "ekodecrux-website",
    storageBucket: "ekodecrux-website.appspot.com",
    messagingSenderId: "794675123294",
    appId: "1:794675123294:web:4d9427e9f64605db92d0cf",
    measurementId: "G-NY9DDEJM24"
}

const app = firebase.initializeApp(firebaseConfig)
export default !firebase.apps.length ? app : firebase.app();