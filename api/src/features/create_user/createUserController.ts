import { CreateUserService } from "./createUserService";

export class CreateUserController {
    constructor(private createUserService: CreateUserService){}
    async handle(Request, Response): Promise<Response> {
        const { name, email, password, birthdate, type } = Request.body;

        try{
            const user = await this.createUserService.execute({
                name, email, password, birthdate, type
            })
            return Response.status(201).json({ user })
        } catch (error){
            return Response.status(400).json({ message: error.message || 'Unexpected error.' })
        }
    }
}