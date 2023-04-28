import { gql } from "@apollo/client";

//  -----  querys  -----
export const ALL_USERS = gql`
  query allUsers($admin: Boolean) {
    allUsers(admin: $admin) {
      id
      admin
      disabled
      guestAccount {
        id
        email
      }
    }
  }
`;

export const ALL_GUESTS = gql`
  query {
    allGuests {
      id
      email
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
      aboutMe
      admin
      disabled
      guestAccount {
        id
        email
        areas {
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
          shareState {
            isShared
            shareRequests
            shareStartDate
            sharedBy
            sharedTo
          }
          shareHistory {
            shareEndDate
            shareStartDate
            sharedBy
            sharedTo
          }
        }
      }
      id
      rank
    }
  }
`;

export const GUEST_COUNT = gql`
  query {
    guestCount
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
export const CREATE_GUEST = gql`
  mutation createGuest($email: String!) {
    createGuest(email: $email) {
      email
    }
  }
`;

export const DELETE_GUEST = gql`
  mutation deleteGuest($email: String, $guestId: ID) {
    deleteGuest(email: $email, guestId: $guestId) {
      id
    }
  }
`;

export const EDIT_GUEST = gql`
  mutation editGuest($email: String!, $guestId: ID!) {
    editGuest(email: $email, guestId: $guestId) {
      email
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
      guestAccount {
        email
        id
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($email: String, $userId: ID, $guestId: ID) {
    deleteUser(email: $email, userId: $userId, guestId: $guestId) {
      id
    }
  }
`;

export const TOGGLE_USER_ADMIN = gql`
  mutation toggleUserAdmin($userId: ID!) {
    toggleUserAdmin(userId: $userId) {
      admin
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
