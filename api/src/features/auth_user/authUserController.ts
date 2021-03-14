import { AuthUserService } from "./authUserService";

export class AuthUserController{
    constructor(
        private authUserService: AuthUserService
    ){}

    async handle(request, response): Promise<any> {
        const { email, password } = request.body;
        try{
            const token = await this.authUserService.execute({ email, password })
            return response.status(200).json({token});
        } catch (error) {
            return response.status(400).json({ message: error.message || 'Unexpected error.'})
        }
        
    }
}