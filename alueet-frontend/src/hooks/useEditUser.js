import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../queries';

const useEditUser = () => {
	const [mutate, result] = useMutation(EDIT_USER);

	const editUser = async ({ admin, userId }) => {
		const { data, loading } = await mutate({
			variables: {
				admin,
				userId,
			},
			onError: (e) => console.error(e),
		});

		return { data, loading };
	};

	return [editUser, result];
};

export default useEditUser;
