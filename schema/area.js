module.exports = `
  type Area {
    id: ID!
    info: Info!
    shareState: ShareState!
    shareHistory: [Shares]
  }

  type Info {
    cityName: String!
    quarter: String!
    address: String!
    buildings: Int!
    latlngs: [latlngs]!
    misc: String
  }

  type Shares {
    sharedTo: String
    sharedBy: String
    shareStartDate: String
    shareEndDate: String
  }

  type latlngs {
    lat: String
    lng: String
  }

  input latlngsType {
    lat: String
    lng: String
  }

  type ShareState {
    isShared: Boolean!
    shareRequests: [String]
    sharedTo: String
    sharedBy: String
    shareStartDate: String
  }

  type Query {
    areaCount: Int!
    allAreas (cityName: String, quarter: String, address: String, isShared: Boolean, requesteeEmail: String, hasRequests: Boolean): [Area]!
  }

  type Mutation {
    createArea (cityName: String!, quarter: String!, address: String!, buildings: Int!, latlngs: [latlngsType]!, misc: String): Area
    editArea (areaId: ID!, cityName: String, quarter: String, address: String, buildings: Int, misc: String): Area
    deleteArea (areaId: ID!): Area

    makeRequest (areaId: ID!): Area
    removeRequest (areaId: ID!): Area
    removeRequestAsAdmin (areaId: ID!, email: String!): Area
    allowAreaRequest (areaId: ID!, email: String!): Area
    returnSharedArea (areaId: ID!): Area
  }
`