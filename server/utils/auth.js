const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretssshhhhhh";
const expiration = "2h";

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
