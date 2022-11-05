import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCpvumBfmJxEVqf8wncjmcHIqyUk-UanoU',
	authDomain: 'react-http-cd316.firebaseapp.com',
	databaseURL: 'https://react-http-cd316-default-rtdb.firebaseio.com',
	projectId: 'react-http-cd316',
	storageBucket: 'react-http-cd316.appspot.com',
	messagingSenderId: '491557731676',
	appId: '1:491557731676:web:c0abacf692a83343935599',
};

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();
export default firebaseApp;
