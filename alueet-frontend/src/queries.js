import { gql } from "@apollo/client";

//  -----  querys  -----
export const ALL_USERS = gql`
  query allUsers($disabled: Boolean, $admin: Boolean) {
    allUsers(disabled: $disabled, admin: $admin) {
      id
      username
      admin
      guestAccount {
        email
        name
        areas
      }
    }
  }
`;

export const ALL_GUESTS = gql`
  query {
    allGuests {
      id
      email
      name
      areas
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
        sharedRequests {
          id
          email
        }
        sharedTo
      }
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
  mutation createGuest($email: String!, $name: String!) {
    createGuest(email: $email, name: $name) {
      email
      name
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
  mutation createUser(
    $username: String!
    $password: String!
    $guestId: String!
  ) {
    createUser(username: $username, password: $password, guestId: $guestId) {
      username
      guestAccount {
        email
        name
      }
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
  mutation login($username: String!, $password: String!) {
    login(usernmae: $username, password: $password) {
      value
    }
  }
`;
