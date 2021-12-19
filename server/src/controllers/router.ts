import { Router } from "express";

import userRouter from "./UserController";

const router = Router();

router.use("/user", userRouter);

export default router;
