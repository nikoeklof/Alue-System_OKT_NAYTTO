import { gql } from '@apollo/client'
import * as f from './fragments'

//  -----  querys  -----
export const ALL_USERS = gql`
	query allUsers($disabled: Boolean, $email: String) {
		allUsers(disabled: $disabled, email: $email) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const ALL_AREAS = gql`
	query allAreas {
		allAreas {
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

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
`

export const AREA_COUNT = gql`
	query {
		areaCount
	}
`

export const USER_COUNT = gql`
	query {
		userCount
	}
`

//  -----  mutations  -----
export const EDIT_USER_EMAIL_AS_ADMIN = gql`
	mutation editUserEmailAsAdmin($userId: ID!, $email: String!) {
		editUserEmailAsAdmin(userId: $userId, email: $email) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const EDIT_USER_EMAIL = gql`
	mutation editUserEmail($email: String!) {
		editUserEmail(email: $email) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const EDIT_USER_PASSWORD = gql`
	mutation editUserPassword($password: String!) {
		editUserPassword(password: $password) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

//needs testing
export const MAKE_REQUEST = gql`
	mutation makeRequest($areaId: ID!) {
		makeRequest(areaId: $areaId) {
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

export const CREATE_USER = gql`
	mutation createUser($password: String!, $email: String!) {
		createUser(password: $password, email: $email) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const DELETE_USER = gql`
	mutation deleteUser($email: String, $userId: ID) {
		deleteUser(email: $email, userId: $userId) {
			id
		}
	}
`

export const TOGGLE_USER_ADMIN = gql`
	mutation toggleUserAdmin($userId: ID!) {
		toggleUserAdmin(userId: $userId) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const TOGGLE_USER_WORKER = gql`
	mutation toggleUserWorker($userId: ID!) {
		toggleUserWorker(userId: $userId) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const TOGGLE_USER_DISABLED = gql`
	mutation toggleUserDisabled($userId: ID!) {
		toggleUserDisabled(userId: $userId) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

export const EDIT_USER_ABOUT = gql`
	mutation editUserAbout($aboutMe: String!) {
		editUserAbout(aboutMe: $aboutMe) {
			...UserDetails
		}
	}
	${f.USER_DETAILS}
`

//needs testing
export const ALLOW_AREA_REQUEST = gql`
	mutation allowAreaRequest($areaId: ID!, $email: String!) {
		allowAreaRequest(areaId: $areaId, email: $email) {
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

//Needs testing
export const RETURN_SHARED_AREA = gql`
	mutation returnSharedArea($areaId: ID!) {
		returnSharedArea(areaId: $areaId) {
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

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
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

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
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

export const REMOVE_REQUESTS = gql`
	mutation removeRequests($areaId: ID!) {
		removeRequest(areaId: $areaId) {
			id
		}
	}
`

export const DENY_LOAN_REQUEST = gql`
	mutation denyRequest($areaId: ID!, $email: String!) {
		removeRequestAsAdmin(areaId: $areaId, email: $email) {
			...AreaDetails
		}
	}
	${f.AREA_DETAILS}
`

//needs testing
export const DELETE_AREA = gql`
	mutation deleteArea($areaId: ID!) {
		deleteArea(areaId: $areaId) {
			id
		}
	}
`

//needs testing
export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			value
		}
	}
`
