const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");

const genToken = (user) => {
  return jwt.sign({ id: user.id }, "my_josnwebtoken_secret-_*KEY*", {
    expiresIn: "10d",
  });
};

module.exports = {
  Query: {
    getUser: async (_, { userId }, context) => {
      let user = await User.findById(userId);

      if (!user) throw new UserInputError("User does not exist!");

      if (user) {
        return {
          ...user._doc,
          id: user._id,
        };
      }
    },
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      let user = await User.findOne({ username });
      if (user) throw new AuthenticationError("Username already taken!");

      password = await bcrypt.hash(password, 12);

      let newUser = new User({
        username,
        email,
        password,
      });

      let res = await newUser.save();

      let token = genToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    login: async (_, { username, password }) => {
      let user = await User.findOne({ username });
      if (!user) throw new AuthenticationError("User does not Exist!");

      let matchedPswd = await bcrypt.compare(password, user.password);
      if (!matchedPswd) throw new AuthenticationError("Incorrect credentials!");

      let token = genToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    updateAccount: async (
      _,
      { username, email, password, profileImgUrl, coverImgUrl },
      context
    ) => {
      const u = checkAuth(context);
      const user = await User.findById(u.id);

      if (!user) throw new UserInputError("User not Found!");

      if (username.trim() != "") user.username = username;
      if (email.trim() != "") user.email = email;
      if (profileImgUrl.trim() != "") user.profileImgUrl = profileImgUrl;
      if (coverImgUrl.trim() != "") user.coverImgUrl = coverImgUrl;

      if (
        username.trim() == "" &&
        email.trim() == "" &&
        profileImgUrl.trim() == "" &&
        coverImgUrl.trim() == ""
      )
        throw new UserInputError("All Fields are empty!");

      try {
        let matchedPswd = await bcrypt.compare(password, user.password);
        if (!matchedPswd) throw new AuthenticationError("Incorrect Password!");

        await user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteAccount: async (_, { password }, context) => {
      const u = checkAuth(context);
      const user = await User.findById(u.id);

      let matchedPswd = await bcrypt.compare(password, user.password);
      if (!matchedPswd) throw new AuthenticationError("Incorrect credentials!");

      // try and remove all feeds and events by this user

      try {
        await user.remove();
        return "Account Successfully Deleted!";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
