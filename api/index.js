const { ApolloServer, gql } = require('apollo-server-micro');
const { readPost, listPosts } = require('./reader');

const typeDefs = gql`
  type Post {
    slug: String
    date: String
    author: String
    title: String
    content: String
  }
  type Query {
    posts: [Post]
    post(slug: String): Post
  }
`;

const resolvers = {
  Query: {
    posts: (root, args, context) => {
      return listPosts();
    },
    post: (root, args, context) => {
      if (args.hasOwnProperty("slug")) {
        return readPost(args.slug);
      } else {
        return {};
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = server.createHandler();