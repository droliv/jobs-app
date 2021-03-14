import { MongoUserRepository } from "../../repositories/user/mongo/mongoUserRepository";
import { AuthUserController } from "./authUserController";
import { AuthUserService } from "./authUserService";

const authUserRepository = new MongoUserRepository();
const authUserService = new AuthUserService(authUserRepository);
const authUserController = new AuthUserController(authUserService);

export { authUserService, authUserController };