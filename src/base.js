import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvCkfTPwKwpMCWypHHSFburuiKfUs_IL8",
    authDomain: "marlaforeman-website.firebaseapp.com",
    databaseURL: "https://marlaforeman-website-default-rtdb.firebaseio.com",
    projectId: "marlaforeman-website",
    storageBucket: "marlaforeman-website.appspot.com",
    messagingSenderId: "580044535945",
    appId: "1:580044535945:web:e86829af311bfc8b29ae58"
});

const base = Rebase.createClass(firebaseApp.database());

const firebaseStorage = firebase.storage();

export { firebaseApp, firebaseStorage };

export default base;