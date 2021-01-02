const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.applyMiddleware({ app });

const PORT = process.env.PORT | 5000;
mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? "mongodb+srv://HueyWhyte:Famous10@whyte.wdm4x.mongodb.net/whyte?retryWrites=true&w=majority"
      : "mongodb://localhost:27017/events_around",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
    return app.listen(PORT);
  })
  .then(() => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
