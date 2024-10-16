import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../Firebase";

const FirebaseAuthContext = React.createContext({
  currentUser: undefined,
  signup: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  updateUserPassword: (user, password) => {},
  loginAsDemo: () => {},
  isDemoUser: () => {},
});

export const useFirebaseAuth = () => {
  return useContext(FirebaseAuthContext);
};

export const FirebaseAuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const DEMO_EMAIL = "demo@kursad.me";

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
    if (user.email === DEMO_EMAIL) {
      return Promise.reject(
        new Error("Cannot change password for demo account")
      );
    }
    return updatePassword(user, password);
  };

  const loginAsDemo = () => {
    const demoPassword = "demopassword123";
    return login(DEMO_EMAIL, demoPassword);
  };

  const isDemoUser = () => {
    return currentUser?.email === DEMO_EMAIL;
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
    loginAsDemo,
    isDemoUser,
  };

  if (isLoading) {
    console.log(isLoading);
  }

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {/* {!isLoading && props.children} */}
      {props.children}
    </FirebaseAuthContext.Provider>
  );
};
