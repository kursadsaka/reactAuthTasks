import { useEffect, useState } from 'react';

import Tasks from './Tasks';
import NewTask from '../NewTask/NewTask';
import useFirebaseRealtime from '../../hooks/use-firebase-realtime';

const TaskPageContent = () => {
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useFirebaseRealtime();
	const { sendRequest: startListening } = useFirebaseRealtime();

	useEffect(() => {
		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				const isCompleted = tasksObj[taskKey].isCompleted;
				loadedTasks.push({
					id: taskKey,
					text: tasksObj[taskKey].text,
					isCompleted: isCompleted ? isCompleted : false,
				});
			}

			setTasks(loadedTasks);
		};
		const applyChanges = (action, task) => {
			if (action === 'add') {
				taskAddHandler({ id: task.key, text: task.val().text });
			}
			if (action === 'update') {
				taskUpdateHandler({
					id: task.key,
					text: task.val().text,
					isCompleted: task.val().isCompleted,
				});
			}
			if (action === 'delete') {
				taskDeleteHandler(task.key);
			}
		};

		fetchTasks(
			{
				endpoint: 'userTasks/',
				method: 'readOnce',
			},
			transformTasks
		);
		startListening(
			{
				endpoint: 'userTasks/',
				method: 'listen',
			},
			applyChanges
		);
	}, [fetchTasks, startListening]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) =>
			!prevTasks.find((t) => t.id === task.id)
				? prevTasks.concat(task)
				: prevTasks
		);
	};

	const taskUpdateHandler = (task) => {
		setTasks((prevTasks) =>
			prevTasks.map((t) =>
				t.id === task.id
					? { ...t, text: task.text, isCompleted: task.isCompleted }
					: t
			)
		);
	};

	const taskDeleteHandler = (taskId) => {
		setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
	};

	return (
		<>
			<NewTask onAddTask={() => {}} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</>
	);
};

export default TaskPageContent;
