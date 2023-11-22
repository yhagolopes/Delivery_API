import Code, { CODE_EXPIRES_IN } from "./models/code.js";
import Token, { TOKEN_EXPIRES_IN } from "./models/token.js";

const deleteExpiredCodesFromDatabase = () => {
  setInterval(async () => {
    console.log("Deleting Codes...");
    const codes = await Code.find({});

    for (let i: number = 0; i < codes.length; i++) {
      if (Date.now() - codes[i].createdAt > CODE_EXPIRES_IN) {
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
      if (Date.now() - tokens[i].createdAt > CODE_EXPIRES_IN) {
        await tokens[i].deleteOne();
      }
    }
  }, TOKEN_EXPIRES_IN);
};

export default {
  deleteExpiredCodesFromDatabase,
  deleteExpiredTokensFromDatabase,
};
