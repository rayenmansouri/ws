import { Router } from 'express';
import { createRoutes } from '../../../../core/Routes/createRoute';
import { getSubjectsOfTeacherClassConfig } from './getSubjectsOfTeacherClass.routes';

const router = Router();

createRoutes(router, getSubjectsOfTeacherClassConfig);

export default router;
