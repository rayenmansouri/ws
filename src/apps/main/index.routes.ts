import "reflect-metadata";
import { Router } from "express";
import path from "path";
import { importAllRoutes } from "./importAllRoutes";

const router = Router();

export const webPublicRouter = Router();
export const webMasterRouter = Router();


export const internalRouter = Router();

router.use(webPublicRouter);
router.use("/master", webMasterRouter);

importAllRoutes(path.join(__dirname, "../../api"));

export default router;
