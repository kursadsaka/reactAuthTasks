import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../Firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
} from 'firebase/auth';

const FirebaseAuthContext = React.createContext({
	currentUser: undefined,
	signup: (email, password) => {},
	login: (email, password) => {},
	logout: () => {},
	updateUserPassword: (user, password) => {},
});

export const useFirebaseAuth = () => {
	return useContext(FirebaseAuthContext);
};

export const FirebaseAuthProvider = (props) => {
	const [currentUser, setCurrentUser] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logout = () => {
		return signOut(firebaseAuth);
	};

	const updateUserPassword = (user, password) => {
		return updatePassword(user, password);
	};

	useEffect(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	const contextValue = {
		currentUser,
		signup,
		login,
		logout,
		updateUserPassword,
	};

	return (
		<FirebaseAuthContext.Provider value={contextValue}>
			{/* {!isLoading && props.children} */}
			{props.children}
		</FirebaseAuthContext.Provider>
	);
};
