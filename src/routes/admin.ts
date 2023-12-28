import { Router } from "express";

import itemController from "../controllers/item/item.js";
import authMiddlewares from "../middlewares/auth/auth.js";
import validationMiddlewares from "../middlewares/validations/validations.js";

const router = Router();
router.use(authMiddlewares.accessToken);
router.use(authMiddlewares.admin);

router.post(
  "/item",
  validationMiddlewares.item,
  validationMiddlewares.image,
  itemController.create
);

export default router;
