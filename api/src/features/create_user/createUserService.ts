import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { ICreateUserRequestDTO } from "./createUserDTO";

export class CreateUserService{
    constructor(
        private userRepository: IUserRepository,
        ){}
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = new User(data);
        const result = await this.userRepository.save(user);
        return result;
    }
}