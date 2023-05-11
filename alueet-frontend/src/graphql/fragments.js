import { gql } from '@apollo/client'

// ----  fragments  -----
export const AREA_DETAILS = gql`
	fragment AreaDetails on Area {
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
			shareRequests
			sharedBy
			shareStartDate
			sharedTo
		}
	}
`


export const USER_DETAILS = gql`
	fragment UserDetails on User {
		id
		email
		rank {
			admin
			worker
			disabled
		}
		aboutMe
	}
`