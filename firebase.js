import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD3S70pGitbEV2kMD_yRxLsxr0OtJvfYnQ",
  authDomain: "berber-2df5c.firebaseapp.com",
  projectId: "berber-2df5c",
  storageBucket: "berber-2df5c.appspot.com",
  messagingSenderId: "493794739289",
  appId: "1:493794739289:web:e071bf4d20d7585b211d48",
  measurementId: "G-RLSYVKR0N0"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };