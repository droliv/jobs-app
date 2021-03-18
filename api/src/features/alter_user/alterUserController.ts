import { AlterUserService } from "./alterUserService";

export class AlterUserController{
    constructor(
        private alterUserService: AlterUserService
    ){}

    async handle(request, response): Promise<any> {
        const id = request.params.id;
        const data = request.body;
        const user = await this.alterUserService.execute(id, data);
        console.log(user);
        return response.status(200).json({ user });
        try{
            const user = await this.alterUserService.execute(id, data)
            return response.status(200).json({ user });
        } catch (error) {
            return response.status(400).json({ message: error.message || 'Unexpected error.'})
        }
        
    }
}