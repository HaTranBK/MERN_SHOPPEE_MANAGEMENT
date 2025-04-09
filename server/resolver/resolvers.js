import data from "../data.js";
export const resolvers = {
  Query: {
    games: () => data.games,
    game: (_, args) => data.games.find((game) => game.id === args.id),
    authors: () => data.authors,
    author: (_, args) => data.authors.find((author) => author.id === args.id),
    reviews: () => data.reviews,
    review: (_, args) => data.reviews.find((review) => review.id === args.id),
    // author() {
    //   return authors;
    // }
  },
  Review: {
    game: (parent, args) =>
      data.games.find((game) => game.id === parent.game_id),
    author: (parent, args) =>
      data.authors.find((author) => author.id === parent.author_id),
  },
  Game: {
    reviews: (parent, args) =>
      data.reviews.filter((review) => review.game_id === parent.id),
  },
  Author: {
    reviews: (parent, args) =>
      data.reviews.filter((review) => review.author_id === parent.id),
  },
  Mutation: {
    addGame: (_, args) => {
      let newGame = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      data.games.push(newGame);
      return newGame;
    },
    deleteGame: (_, args) => data.games.filter((game) => game.id !== args.id),
  },
};
