import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../store/firebase-auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { logout, currentUser } = useFirebaseAuth();
  const isUserLoggedIn = !!currentUser;

  const logoutHandler = () => {
    logout()
      .then(() => {})
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <header className={classes.header}>
      <Link to="/reactAuthTasks/" className={classes.logo}>
        TaskMaster
      </Link>
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          {!isUserLoggedIn && (
            <li className={classes.navItem}>
              <Link to="/reactAuthTasks/auth" className={classes.navLink}>
                Login
              </Link>
            </li>
          )}
          {isUserLoggedIn && (
            <li className={classes.navItem}>
              <Link to="/reactAuthTasks/profile" className={classes.navLink}>
                Profile
              </Link>
            </li>
          )}
          {isUserLoggedIn && (
            <li className={classes.navItem}>
              <button onClick={logoutHandler} className={classes.navButton}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
