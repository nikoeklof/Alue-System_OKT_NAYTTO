module.exports = `
  type Guest {
    id: ID!
    email: String!
    areas: [Area]!
  }

  type Query {
    guestCount: Int!
    allGuests: [Guest]!
  }

  type Mutation {
    createGuest (email: String!): Guest
    deleteGuest (email: String, guestId: ID): Guest
    editGuest (email: String!, guestId: ID!): Guest
  }
`;
