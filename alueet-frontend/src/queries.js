import { gql } from '@apollo/client';

//  -----  querys  -----
export const ALL_USERS = gql`
	query allUsers($disabled: Boolean) {
		allUsers(disabled: $disabled) {
			id
			email
			rank {
				admin
				worker
				disabled
			}
			aboutMe
		}
	}
`;

export const FILTERED_AREAS = gql`
	query filteredAreas($cityName: String) {
		allAreas(cityName: $cityName) {
			id
			info {
				address
				buildings
				cityName
				latlngs {
					lat
					lng
				}
				misc
				quarter
			}
			shareHistory {
				shareEndDate
				shareStartDate
				sharedBy
				sharedTo
			}
			shareState {
				isShared
				shareRequests
				shareStartDate
				sharedBy
				sharedTo
			}
		}
	}
`;
export const FILTERED_BY_QUARTER = gql`
	query filteredAreas($quarter: String, $cityName: String) {
		allAreas(quarter: $quarter, cityName: $cityName) {
			id
			info {
				address
				buildings
				cityName
				latlngs {
					lat
					lng
				}
				misc
				quarter
			}
			shareHistory {
				shareEndDate
				shareStartDate
				sharedBy
				sharedTo
			}
			shareState {
				isShared
				shareRequests
				shareStartDate
				sharedBy
				sharedTo
			}
		}
	}
`;

export const ALL_AREAS = gql`
	query allAreas {
		allAreas {
			id
			info {
				misc
				quarter
				latlngs {
					lat
					lng
				}
				cityName
				buildings
				address
			}
			shareHistory {
				shareEndDate
				shareStartDate
				sharedBy
				sharedTo
			}
			shareState {
				isShared
				shareStartDate
				sharedBy
				shareRequests {
					id
					email
				}
				sharedTo
			}
		}
	}
`;
export const ME = gql`
	query me {
		me {
			email
			aboutMe
			id
			rank {
				disabled
				admin
				worker
			}
		}
	}
`;

export const AREA_COUNT = gql`
	query {
		areaCount
	}
`;

export const USER_COUNT = gql`
	query {
		userCount
	}
`;

//  -----  mutations  -----
export const EDIT_USER_EMAIL_AS_ADMIN = gql`
	mutation editUserEmailAsAdmin($userId: ID!, $email: String!) {
		editUserEmailAsAdmin(userId: $userId, email: $email) {
			id
			email
		}
	}
`;

export const EDIT_USER_EMAIL = gql`
	mutation editUserEmail($email: String!) {
		editUserEmail(email: $email) {
			id
			email
		}
	}
`;

export const EDIT_USER_PASSWORD = gql`
	mutation editUserPassword($password: String!) {
		editUserPassword(password: $password) {
			id
		}
	}
`;

//needs testing
export const MAKE_REQUEST = gql`
	mutation makeRequest($areaId: ID!, $email: String!) {
		makeRequest(areaId: $areaId, email: $email) {
			id
			shareState {
				isShared
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($password: String!, $email: String!) {
		createUser(password: $password, email: $email) {
			id
			email
			rank {
				admin
				disabled
				worker
			}
			aboutMe
		}
	}
`;

export const DELETE_USER = gql`
	mutation deleteUser($email: String, $userId: ID) {
		deleteUser(email: $email, userId: $userId) {
			id
		}
	}
`;

export const TOGGLE_USER_ADMIN = gql`
	mutation toggleUserAdmin($userId: ID!) {
		toggleUserAdmin(userId: $userId) {
			id
		}
	}
`;

export const TOGGLE_USER_DISABLED = gql`
	mutation toggleUserDisabled($userId: ID!) {
		toggleUserDisabled(userId: $userId) {
			id
		}
	}
`;

export const EDIT_USER_ABOUT = gql`
	mutation editUserAbout($aboutMe: String!) {
		editUserAbout(aboutMe: $aboutMe) {
			id
			aboutMe
		}
	}
`;

//needs testing
export const ALLOW_AREA_REQUEST = gql`
	mutation allowAreaRequest($areaId: ID!, $email: String!) {
		allowAreaRequest(areaId: $areaId, email: $email) {
			id
			shareState {
				isShared
			}
			shareHistory {
				sharedBy
				sharedTo
			}
		}
	}
`;
//Needs testing
export const RETURN_SHARED_AREA = gql`
	mutation returnSharedArea($areaId: ID!) {
		returnSharedArea(areaId: $areaId) {
			id
		}
	}
`;
//needs testing
export const CREATE_AREA = gql`
	mutation createArea(
		$cityName: String!
		$quarter: String!
		$address: String!
		$buildings: Int!
		$latlngs: [latlngsType]!
		$misc: String
	) {
		createArea(
			cityName: $cityName
			quarter: $quarter
			address: $address
			buildings: $buildings
			latlngs: $latlngs
			misc: $misc
		) {
			info {
				address
				buildings
				cityName
				latlngs {
					lat
					lng
				}
				misc
				quarter
			}
			id
		}
	}
`;

export const EDIT_AREA = gql`
	mutation (
		$areaId: ID!
		$cityName: String
		$quarter: String
		$address: String
		$buildings: Int
		$misc: String
	) {
		editArea(
			areaId: $areaId
			cityName: $cityName
			quarter: $quarter
			address: $address
			buildings: $buildings
			misc: $misc
		) {
			id
			info {
				address
				buildings
				cityName
				latlngs {
					lat
					lng
				}
				misc
				quarter
			}
		}
	}
`;
//needs testing
export const DELETE_AREA = gql`
	mutation deleteArea($areaId: ID!) {
		deleteArea(areaId: $areaId) {
			id
		}
	}
`;
//needs testing
export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			value
		}
	}
`;
