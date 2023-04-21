module.exports = `
  type User {
    id: ID!
    admin: Boolean
    disabled: Boolean
    guestAccount: Guest
  }

  type Token {
    value: String!
  }

  type Query {
    userCount: Int!
    allUsers (admin: Boolean): [User]!

    me: User
  }

  type Mutation {
    createUser (email: String!, password: String!): User
    changeUserPassword (password: String!): User
    changeUserAbout (aboutMe: String!): User
    editUser (admin: Boolean, userId: String): User
    addUserRank (rank: String!): User
    removeUserRank (rank: String!): User

    login (email: String!, password: String!): Token
  }
`;
