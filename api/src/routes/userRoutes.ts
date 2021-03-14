import { Request, Response, Router } from 'express';
import { createUserController } from '../features/create_user';

const userRoutes = Router();

userRoutes.post('/users', (Request, Response) => {
    return createUserController.handle(Request, Response);
})

export { userRoutes };