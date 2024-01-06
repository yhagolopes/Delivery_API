import Code from "./models/code.js";
import { TIME_TO_CODE_EXPIRE } from "./errors/auth/registerCode.js";
import { hasExpired } from "./utils/utils.js";

const deleteExpiredCodesFromDatabase = () => {
  setInterval(async () => {
    console.log("Deleting Codes...");
    const codes = await Code.find({});

    for (let i: number = 0; i < codes.length; i++) {
      const hasCodeExpired = hasExpired(
        codes[i].createdAt,
        TIME_TO_CODE_EXPIRE
      );
      if (hasCodeExpired) {
        await codes[i].deleteOne();
      }
    }
  }, TIME_TO_CODE_EXPIRE);
};

export default {
  deleteExpiredCodesFromDatabase,
};
