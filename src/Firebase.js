import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRwiN9PN4rvA8aXkHillk1FkIWhwMEpys",
  authDomain: "react-http-cd316.firebaseapp.com",
  databaseURL: "https://react-http-cd316-default-rtdb.firebaseio.com",
  projectId: "react-http-cd316",
  storageBucket: "react-http-cd316.appspot.com",
  messagingSenderId: "491557731676",
  appId: "1:491557731676:web:a616199c26630caf935599",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();
export default firebaseApp;
