import { gql } from "apollo-server-express";

//Khi dùng query mà truy vấn đó cần dữ liệu động bên ngoài truyền vào thì phải tạo tham số trên dòng tham vấn đầu tiên rồi trong field nào cần tham số đó thì lại pass tham số đó vào
//=========VD=======//

//query myquery($id:ID!){
//card(id:$id){}
//}

export const typeDefs = gql`
  type Game {
    id: ID!
    title: String!
    platform: [String]
    reviews: [Review]
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review]!
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }
  # ROOT TYPE
  type Query {
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
    reviews: [Review]
    review(id: ID!): Review
  }
  type Mutation {
    deleteGame(id: ID!): [Game]
    addGame(game: AddGameInput): Game
  }
  input AddGameInput {
    title: String!
    platform: [String]!
  }
`;
