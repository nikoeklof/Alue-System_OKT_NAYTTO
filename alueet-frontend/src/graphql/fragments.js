import { gql } from "@apollo/client";

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
`;

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    aboutMe
    areas {
      id
      info {
        address
        buildings
        cityName
        misc
        quarter
      }
    }
    id
    email
    rank {
      admin
      disabled
      worker
    }
  }
`;
