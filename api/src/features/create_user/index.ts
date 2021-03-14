import { MongoUserRepository } from "../../repositories/user/mongo/mongoUserRepository";
import { CreateUserController } from "./createUserController";
import { CreateUserService } from "./createUserService";

const createUserRepository = new MongoUserRepository();
const createUserService = new CreateUserService(createUserRepository);
const createUserController = new CreateUserController(createUserService);

export { createUserService, createUserController };