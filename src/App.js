import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useFirebaseAuth } from './store/firebase-auth-context';

function App() {
	const { currentUser } = useFirebaseAuth();

	const isUserLoggedIn = currentUser ? true : false;

	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<HomePage />
				</Route>
				{!isUserLoggedIn && (
					<Route path='/auth'>
						<AuthPage />
					</Route>
				)}
				{isUserLoggedIn && (
					<Route path='/profile'>
						<UserProfile />
					</Route>
				)}
				<Route path='*'>
					<Redirect to='/' />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
