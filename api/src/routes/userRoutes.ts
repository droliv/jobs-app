import { Request, Response, Router } from 'express';
import { createUserController } from '../features/create_user';
import VerifyToken from '../middlewares/verifyToken';

const userRoutes = Router();

userRoutes.post('/users', (Request, Response) => {
    return createUserController.handle(Request, Response);
})

userRoutes.put('/users/:id', (Request, Response, Next) =>{
    return VerifyToken.handle(Request, Response, Next);
  }, (Request, Response) => {
    console.log('Request Type:')
  })

export { userRoutes };