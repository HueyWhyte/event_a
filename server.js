const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT | 5000;
mongoose
  .connect("mongodb://localhost:27017/events_around", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    return server.listen(PORT);
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
