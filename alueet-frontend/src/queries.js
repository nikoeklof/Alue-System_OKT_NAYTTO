import { gql } from '@apollo/client';


//  -----  querys  -----
export const ALL_USERS = gql`
query {
  allUsers {
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
query {
  allAreas {
    id
    info {
      type
      cityName
      quarter
      address
      buildings
      homes
      map {
        coordinates {
          lan
          lon
        }
        zone
      }
      misc
    }
    shareState {
      isShared
      sharedRequests {
        id
        email
        name
      }
      sharedTo {
        id
        email
        name
      }
      sharedBy {
        id
        username
        guestAccount {
          email
        }
      }
      shareStartDate
    }
    shareHistory {
      sharedTo {
        id 
        email
        name
      }
      sharedBy {
        id
        username
        guestAccount {
          email
        }
      }
      shareStartDate
      shareEndDate
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
  createGuest(
    email: $email,
    name: $name
  ) {
    email
    name
  }
}
`;
//needs testing
export const MAKE_REQUEST = gql`
mutation makeRequest($areaId: ID!, $guestEmail: String!) {
  makeRequest(
    areaId: $areaId,
    guestEmail: $guestEmail
  ) {
    shareState
  }
}
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!, $guestId: String!) {
  createUser(
    username: $username,
    password: $password,
    guestId: $guestId
  ) {
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
  toggleUserDisabled(
    userId: $userId
  ) {
    id
  }
}
`;

//needs testing
export const ALLOW_AREA_REQUEST = gql`
mutation allowAreaRequest($areaId: ID!, $guestId: ID!) {
  allowAreaRequest(
    userId: $userId,
    guestId: $guestId
  ) {
    id
  }
}
`;
//Needs testing
export const RETURN_SHARED_AREA = gql`
mutation returnSharedArea($areaId: ID!) {
  returnSharedArea(
    areaId: $areaId
  ) {
    id
  }
}
`;
//needs testing
export const CREATE_AREA = gql`
mutation createArea($type: String!, $cityName: String!, $quarter: String!, $address: String!, $buildings: Int!, $homes: Int!, $zone: String!, $lan: String!, $lon: String!, $misc: String) {
  createArea(
    type: $type, 
    cityName: $cityName, 
    quarter: $quarter, 
    address: $addres, 
    buildings: $buildings, 
    homes: $homes, 
    zone: $zone, 
    lan: $lan, 
    lon: $lon, 
    misc: $misc
  ) {
    id
  }
}
`;


export const EDIT_AREA = gql`
mutation editArea($areaId: ID!, $type: String, $cityName: String, $quarter: String, $address: String, $buildings: Int, $homes: Int, $map: MapInput, $misc: String) {
  editArea(
    areaId: $areaId,
    type: $type,
    cityName: $cityName,
    quarter: $quarter,
    address: $address,
    buildings: $buildings,
    homes: $homes,
    map: $map,
    misc: $misc
  ) {
    id
  }
}
`;
//needs testing
export const DELETE_AREA = gql`
mutation deleteArea($areaId: ID!) {
  deleteArea(
    areaId: $areaId
  ) {
    id
  }
}
`;
//needs testing
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    usernmae: $username,
    password: $password
  ) {
    value
  }
}
`;