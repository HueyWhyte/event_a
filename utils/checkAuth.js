const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const token = context.req.headers["x-auth-token"];

  if (token) {
    try {
      const user = jwt.verify(token, "my_josnwebtoken_secret-_*KEY*");
      return user;
    } catch (err) {
      throw new AuthenticationError("Invalid/Expired token");
    }
  } else {
    throw new Error("Authentication token must be provided");
  }
};
