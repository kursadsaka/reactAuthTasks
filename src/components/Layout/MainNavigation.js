import { Link } from 'react-router-dom';

import { useFirebaseAuth } from '../../store/firebase-auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const { logout, currentUser } = useFirebaseAuth();

	const isUserLoggedIn = currentUser ? true : false;

	const logoutHandler = () => {
		logout()
			.then(() => {})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<header className={classes.header}>
			<Link to='/reactAuthTasks/'>
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!isUserLoggedIn && (
						<li>
							<Link to='/reactAuthTasks/auth'>Login</Link>
						</li>
					)}
					{isUserLoggedIn && (
						<li>
							<Link to='/reactAuthTasks/profile'>Profile</Link>
						</li>
					)}
					{isUserLoggedIn && (
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
