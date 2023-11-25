import Code, { CODE_EXPIRES_IN } from "./models/code.js";
import Token, { TOKEN_EXPIRES_IN } from "./models/token.js";
import { hasExpired } from "./utils/utils.js";

const deleteExpiredCodesFromDatabase = () => {
  setInterval(async () => {
    console.log("Deleting Codes...");
    const codes = await Code.find({});

    for (let i: number = 0; i < codes.length; i++) {
      const hasCodeExpired = hasExpired(codes[i].createdAt, CODE_EXPIRES_IN);
      if (hasCodeExpired) {
        await codes[i].deleteOne();
      }
    }
  }, CODE_EXPIRES_IN);
};

const deleteExpiredTokensFromDatabase = () => {
  setInterval(async () => {
    console.log("Deleting Tokens...");
    const tokens = await Token.find({});

    for (let i: number = 0; i < tokens.length; i++) {
      const hasTokenExpired = hasExpired(tokens[i].createdAt, TOKEN_EXPIRES_IN);
      if (hasTokenExpired) {
        await tokens[i].deleteOne();
      }
    }
  }, TOKEN_EXPIRES_IN);
};

export default {
  deleteExpiredCodesFromDatabase,
  deleteExpiredTokensFromDatabase,
};
