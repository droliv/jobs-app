import jwt from "jsonwebtoken";
import { IUserRepository } from "../repositories/user/IUserRepository";
import { MongoUserRepository } from "../repositories/user/mongo/mongoUserRepository";

class VerifyToken {

  constructor(private userRepository: IUserRepository) {}

  async handle(Request, Response, Next) {
    const secret = "2904375irofjejjhnhbtrkmkbgjhio";
    const token = Request.headers.authorization;

    if (!token) {
      return Response.status(400).json({ message: "Missing auth token" });
    }
    try {
      const decoded = jwt.verify(token, secret);
      const user = await this.userRepository.findByEmail(decoded.data.email);
      console.log('user', user);
      if (!user) {
        return Response.status(401).json({ message: "Invalid token." });
      }
      Request.user = user;

      Next();
    } catch (err) {
      return Response.status(401).json({ message: "Invalid token." });
    }
  }
}
const mongoUserRepository = new MongoUserRepository();
export default  new VerifyToken(mongoUserRepository);