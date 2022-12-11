import useFirebaseRealtime from '../../hooks/use-firebase-realtime';
import Button from '../UI/Button';

import classes from './TaskItem.module.css';

const TaskItem = (props) => {
	const {
		isLoading,
		error,
		sendRequest: sendDeleteTaskRequest,
	} = useFirebaseRealtime();

	const deleteTaskHandler = (key) => {
		sendDeleteTaskRequest({
			endpoint: 'userTasks/',
			method: 'remove',
			key,
		});
	};

	return (
		<li className={classes.task}>
			{error && <p>{error}</p>}
			{props.children}
			<Button
				onClick={() => {
					deleteTaskHandler(props.id);
				}}
				disabled={isLoading}
				isLoading={isLoading}
			>
				X
			</Button>
		</li>
	);
};

export default TaskItem;
