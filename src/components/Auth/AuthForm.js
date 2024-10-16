import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useFirebaseAuth } from "../../store/firebase-auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const { signup, login, loginAsDemo } = useFirebaseAuth();

  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);

    const funcToUse = isLogin ? login : signup;

    funcToUse(enteredEmail, enteredPassword)
      .then(() => {
        history.replace("/reactAuthTasks/");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const demoLoginHandler = () => {
    setIsLoading(true);
    loginAsDemo()
      .then(() => {
        history.replace("/reactAuthTasks/");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <button
            type="button"
            className={classes.demoButton}
            onClick={demoLoginHandler}
            disabled={isLoading}
          >
            Login as Demo User
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
