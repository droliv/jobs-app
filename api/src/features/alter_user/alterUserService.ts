import validator from "../../helpers/validator";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IAlterUserDTO } from "./alterUserDTO";

export class AlterUserService {
    constructor(
        private userRepository: IUserRepository,
    ){}

    async execute(data: IAlterUserDTO) {
        const user = await this.userRepository.findById(data.id);
        if(!user) {
            throw new Error('User not found.');
        }
        if (data.email) {
            if(!validator.isValidMail(data.email)) {
                throw new Error('Invalid entries, try again.');
            }
        }

    }
}