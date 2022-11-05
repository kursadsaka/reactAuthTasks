import { useCallback, useState } from 'react';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

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

			try {
				if (requestConfig.method === 'push') {
					const endpointRef = ref(db, requestConfig.endpoint + userId);
					const newEndpointRef = push(endpointRef);
					set(newEndpointRef, requestConfig.body ? requestConfig.body : null);
					applyData(newEndpointRef);
				} else if (requestConfig.method === 'readOnce') {
					onValue(
						ref(db, requestConfig.endpoint + userId),
						(snapshot) => applyData(snapshot.val()),
						{
							onlyOnce: true,
						}
					);
				}
			} catch (err) {
				setError(err.message || 'Something went wrong!');
			}
			await new Promise((r) => setTimeout(r, 500));
			setIsLoading(false);
		},
		[currentUser.uid]
	);

	return { isLoading, error, sendRequest };
};

export default useFirebaseRealtime;
