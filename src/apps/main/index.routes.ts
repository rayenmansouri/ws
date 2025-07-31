import "reflect-metadata";
import { Router } from "express";
import path from "path";
import { importAllRoutes } from "./importAllRoutes";

const router = Router();

export const webPublicRouter = Router();


export const internalRouter = Router();

router.use(webPublicRouter);

importAllRoutes(path.join(__dirname, "../../api-v2")); //only import schools for now
export default router;
