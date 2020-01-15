const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { filterPosts, readPost, listPosts } = require('./reader');

const types = fs.readFileSync(path.join(__dirname, '..', 'graphql', 'schema.graphql'));
const typeDefs = gql`${types}`;

const resolvers = {
  Query: {
    posts: () => {
      return listPosts();
    },
    post: (root, args, context) => {
      if (args.hasOwnProperty("slug")) {
        return readPost(args.slug);
      } else {
        return {};
      }
    },
    tag: (root, args, context) => {
      if (args.hasOwnProperty('tag')) {
        return filterPosts(post => post.tags.includes(args.tag.toLowerCase()));
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