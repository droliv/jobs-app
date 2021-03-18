import bcrypt from 'bcrypt-nodejs';
import { generateToken } from '../../helpers/generateToken';
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IAuthUserDTO } from "./authUserDTO";

export class AuthUserService {
    constructor(
        private userRepository: IUserRepository
    ){}

    async execute(data: IAuthUserDTO) {
        if (!data.email || !data.password) {
            throw new Error('All fields must be filled.');
        }
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid credentials, try again');
        }
        const isPasswordMath = bcrypt.compareSync(data.password, user.password);
        console.log(isPasswordMath);
        console.log(user);
        if(!isPasswordMath) {
            throw new Error('Invalid credentials, try again');
        }
        const { password, _id, ...withoutPassword} = user;
        const token = await generateToken(withoutPassword);
        return token

    }
}