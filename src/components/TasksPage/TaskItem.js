import useFirebaseRealtime from '../../hooks/use-firebase-realtime';
import Button from '../UI/Button';

import classes from './TaskItem.module.css';

const TaskItem = (props) => {
	const {
		isLoading,
		error,
		sendRequest: sendDeleteTaskRequest,
	} = useFirebaseRealtime();

	const {
		isLoadingCheck,
		errorCheck,
		sendRequest: sendCheckTaskRequest,
	} = useFirebaseRealtime();

	const deleteTaskHandler = (key) => {
		sendDeleteTaskRequest({
			endpoint: 'userTasks/',
			method: 'remove',
			key,
		});
	};

	const checkboxHandler = (isCompleted, key) => {
		sendCheckTaskRequest({
			endpoint: 'userTasks/',
			method: 'update',
			body: { text: props.taskText, isCompleted: isCompleted },
			key,
		});
	};

	return (
		<li className={classes.task}>
			{error && <p>{error}</p>}
			{errorCheck && <p>{errorCheck}</p>}
			<div>
				<input
					type='checkbox'
					checked={props.isCompleted}
					onChange={(event) => {
						checkboxHandler(event.target.checked, props.id);
					}}
					disabled={isLoadingCheck}
				></input>
				{props.isCompleted && <s>{props.children}</s>}
				{!props.isCompleted && props.children}
			</div>
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
