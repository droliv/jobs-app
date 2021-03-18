import { MongoUserRepository } from "../../repositories/user/mongo/mongoUserRepository";
import { AlterUserController } from "./alterUserController";
import { AlterUserService } from "./alterUserService";

const alterUserRepository = new MongoUserRepository();
const alterUserService = new AlterUserService(alterUserRepository);
const alterUserController = new AlterUserController(alterUserService);

export { alterUserService, alterUserController };