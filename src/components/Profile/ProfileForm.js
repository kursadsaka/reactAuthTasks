import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useFirebaseAuth } from '../../store/firebase-auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const { currentUser, updateUserPassword } = useFirebaseAuth();

	const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();

	const newPasswordInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		// add validation;

		updateUserPassword(currentUser, enteredNewPassword)
			.then(() => {
				history.replace('/');
			})
			.catch((err) => {
				alert(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					type='password'
					id='new-password'
					minLength='7'
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				{!isLoading && <button>Change Password</button>}
				{isLoading && <p>Sending request...</p>}
			</div>
		</form>
	);
};

export default ProfileForm;
