import Validator  from "../../helpers/validator";
import { passwordHash } from '../../helpers/generatePasswordHash';
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
            throw new Error('User already exists.');
        }
        const validEntries = Validator.validEntries(data);

        if (!validEntries) {
            throw new Error('Invalid entries, try again.');
        }

        if (data.type === 'admin') {
            throw new Error('Only admins can create admin user.');
        }

        data.password = await passwordHash(data.password);

        const user = new User(data);
        const result = await this.userRepository.save(user);
        
        return result;
    }
}