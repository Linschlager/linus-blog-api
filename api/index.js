const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
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

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app, cors: true, path: '/' });

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});

module.exports = app;