import { User } from "../../models/User";

export interface IUserRepository{
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
  //update(id: string, user: User): Promise<User>;
}