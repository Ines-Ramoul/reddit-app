const { buildSchema } = require('graphql');

module.exports= buildSchema(`
type User {
  _id : ID!
  username: String!
  password: String
  favSubreddits: [String!]
}


type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input UserInput {
  username : String!
  password: String!
}

  

 type RootQuery  {
  users : [User!]
  login(username : String!, password: String!) : AuthData!

}

type RootMutation  {
  createUser(userInput: UserInput) : User
}

 schema {
   query : RootQuery
   mutation: RootMutation
 }
`)