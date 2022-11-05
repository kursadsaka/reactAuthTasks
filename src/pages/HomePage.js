import StartingPageContent from '../components/StartingPage/StartingPageContent';
import TasksPageContent from '../components/TasksPage/TasksPageContent';
import { useFirebaseAuth } from '../store/firebase-auth-context';

const HomePage = () => {
	const { currentUser } = useFirebaseAuth();
	const isUserLoggedIn = currentUser ? true : false;

	return (
		<>
			<StartingPageContent />
			{isUserLoggedIn && <TasksPageContent />}
		</>
	);
};

export default HomePage;
