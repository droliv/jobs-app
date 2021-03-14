import { Request, Response, Router } from 'express';
import { authUserController } from '../features/auth_user'

const authRoutes = Router();

authRoutes.post('/login', (Request, Response) => {
    return authUserController.handle(Request, Response);
})

export { authRoutes };