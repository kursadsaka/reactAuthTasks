import React, { useState } from 'react';

const AuthContext = React.createContext({
	token: '',
	isUserLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);

	const isUserLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
	};

	const contextValue = {
		token: token,
		isUserLoggedIn: isUserLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
