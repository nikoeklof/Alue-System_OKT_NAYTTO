import { useQuery } from '@apollo/client';
import { ALL_USERS } from '../queries';

const useGetUsers = (variables) => {
	const { loading, data, ...result } = useQuery(ALL_USERS, {
		variables,
		fetchPolicy: 'cache-and-network',
		onError: (e) => console.error('userError: ' + e),
	});
	return { data, loading, ...result };
};

export default useGetUsers;
