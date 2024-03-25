const crypto = require("crypto");
const { GraphQLScalarType, Kind } = require("graphql");

const encryptEmail = (email) => {
  const secret = process.env.SECRET || "my_email_encryption_secret";
  const cipher = crypto.createCipher("aes-256-cbc", secret);
  let encryptedEmail = cipher.update(email, "utf-8", "hex");
  encryptedEmail += cipher.final("hex");

  return encryptedEmail;
};

const decryptEmail = (email) => {
  const secret = process.env.SECRET || "my_email_encryption_secret";
  const decipher = crypto.createDecipher("aes-256-cbc", secret);
  let decryptedEmail = decipher.update(email, "hex", "utf-8");
  decryptedEmail += decipher.final("utf-8");

  return decryptedEmail;
};

const encryptToken = (token) => {
  const secret = process.env.SECRET || "my_token_encryption_secret";
  const cipher = crypto.createCipher("aes-256-cbc", secret);
  let encryptedToken = cipher.update(token, "utf-8", "hex");
  encryptedToken += cipher.final("hex");

  return encryptedToken;
};

const DateTime = new GraphQLScalarType({
  name: "Date",
  description: "ISO 8601 date string",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

module.exports = { encryptEmail, decryptEmail, encryptToken, DateTime };
