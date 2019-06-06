const { ApolloServer, gql } = require('apollo-server-micro');
const cors = require('micro-cors')();
const fs = require('fs');
const path = require('path');
const { readPost, listPosts } = require('./reader');

const types = fs.readFileSync(path.join(__dirname, '..', 'graphql', 'schema.graphql'));
const typeDefs = gql`${types}`;

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
  playground: false
});

module.exports = cors((req, res) => {
  if (req.method === "OPTIONS") {
    res.send();
    return;
  }
  return server.createHandler()
});