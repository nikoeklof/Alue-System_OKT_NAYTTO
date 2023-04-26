module.exports = `
  type User {
    id: ID!
    admin: Boolean
    disabled: Boolean
    guestAccount: Guest
    rank: [String]
    aboutMe: String
  }

  type Token {
    value: String!
  }

  type Query {
    userCount: Int!
    allUsers (admin: Boolean, disabled: Boolean): [User]!

    me: User
  }

  type Mutation {
    createUser (email: String!, password: String!): User
    changeUserPassword (password: String!): User
    changeUserAbout (aboutMe: String!): User
    addUserRank (rank: String!): User
    removeUserRank (rank: String!): User
    deleteUser (email: String, userId: ID, guestId: ID): User

    toggleUserDisabled (userId: ID!): User
    toggleUserAdmin (userId: ID!): User

    login (email: String!, password: String!): Token
  }
`;
