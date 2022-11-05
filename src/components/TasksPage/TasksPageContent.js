import { useEffect, useState } from 'react';

import Tasks from './Tasks';
import NewTask from '../NewTask/NewTask';
import useFirebaseRealtime from '../../hooks/use-firebase-realtime';

const TaskPageContent = () => {
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useFirebaseRealtime();

	useEffect(() => {
		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
			}

			setTasks(loadedTasks);
		};

		fetchTasks(
			{
				endpoint: 'userTasks/',
				method: 'readOnce',
			},
			transformTasks
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<>
			<NewTask onAddTask={taskAddHandler} />
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
