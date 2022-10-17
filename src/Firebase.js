// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCpvumBfmJxEVqf8wncjmcHIqyUk-UanoU',
	authDomain: 'react-http-cd316.firebaseapp.com',
	databaseURL: 'https://react-http-cd316-default-rtdb.firebaseio.com',
	projectId: 'react-http-cd316',
	storageBucket: 'react-http-cd316.appspot.com',
	messagingSenderId: '491557731676',
	appId: '1:491557731676:web:c0abacf692a83343935599',
};

// // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
