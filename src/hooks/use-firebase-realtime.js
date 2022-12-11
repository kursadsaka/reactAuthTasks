import { useCallback, useState } from 'react';
import {
	getDatabase,
	ref,
	set,
	push,
	onValue,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	remove,
} from 'firebase/database';

import { useFirebaseAuth } from '../store/firebase-auth-context';

const useFirebaseRealtime = () => {
	const { currentUser } = useFirebaseAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (requestConfig, applyData) => {
			setIsLoading(true);
			setError(null);

			const db = getDatabase();
			const userId = currentUser.uid;
			const endpointRef = ref(db, requestConfig.endpoint + userId);

			try {
				if (requestConfig.method === 'push') {
					const newEndpointRef = push(endpointRef);
					set(newEndpointRef, requestConfig.body ? requestConfig.body : null);
					applyData(newEndpointRef);
					setIsLoading(false);
				} else if (requestConfig.method === 'remove') {
					await remove(
						ref(db, requestConfig.endpoint + userId + '/' + requestConfig.key)
					);
					setIsLoading(false);
				} else if (requestConfig.method === 'readOnce') {
					onValue(
						endpointRef,
						(snapshot) => {
							applyData(snapshot.val());
							setIsLoading(false);
						},
						{
							onlyOnce: true,
						}
					);
				} else if (requestConfig.method === 'listen') {
					setIsLoading(false);

					onChildAdded(endpointRef, (data) => {
						applyData('add', data);
					});

					onChildChanged(endpointRef, (data) => {
						applyData('update', data);
					});

					onChildRemoved(endpointRef, (data) => {
						applyData('delete', data);
					});
				}
			} catch (err) {
				setError(err.message || 'Something went wrong!');
				setIsLoading(false);
			}
		},
		[currentUser.uid]
	);

	return { isLoading, error, sendRequest };
};

export default useFirebaseRealtime;
