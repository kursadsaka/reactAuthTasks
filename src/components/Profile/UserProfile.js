import { useFirebaseAuth } from '../../store/firebase-auth-context';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
	const { currentUser } = useFirebaseAuth();

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<h1>{currentUser.email}</h1>
			<ProfileForm />
		</section>
	);
};

export default UserProfile;
