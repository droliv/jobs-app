import validator from "../../helpers/validator";
import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IAlterUserDTO } from "./alterUserDTO";

export class AlterUserService {
    constructor(
        private userRepository: IUserRepository,
    ){}

    async execute(id: string, data: IAlterUserDTO) {
        let user = await this.userRepository.findById(id);
        console.log(user);
        if(!user) {
            throw new Error('User not found.');
        }
        if (data.email) {
            if(!validator.isValidMail(data.email)) {
                throw new Error('Invalid entries, try again.');
            }
        }
        user = new User(user);
        Object.assign(user, data);
        const result  = await this.userRepository.update(id, user);
        console.log(result);
        return result;
    }
}