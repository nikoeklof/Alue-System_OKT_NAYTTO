module.exports = `
  type User {
    id: ID!
    email: String
    admin: Boolean
    worker: Boolean
    disabled: Boolean
    aboutMe: String
    areas: [Area]
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
    editUserEmail ( email: String!): User
    editUserPassword (password: String!): User
    editUserAbout (aboutMe: String!): User
    deleteUser (email: String, userId: ID, guestId: ID): User

    toggleUserDisabled (userId: ID!): User
    toggleUserWorker (userId: ID!): User
    toggleUserAdmin (userId: ID!): User

    login (email: String!, password: String!): Token
  }
`;
