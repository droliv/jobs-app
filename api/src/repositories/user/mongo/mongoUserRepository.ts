import { connection } from '../../../database/mongo/connect';
import { User } from '../../../models/User';
import { IUserRepository } from '../IUserRepository';

export class MongoUserRepository implements IUserRepository {

    async findById(id: string): Promise<User>{
        return new Promise(async (resolve, reject) => {
            try {
                const db = await connection();
                const user = await db.collection('users').findOne({ id });
                if (!user) return resolve(null);
                resolve(user);
              } catch (err) {
                reject(err);
              }
        });
    }

    async findByEmail(email: string): Promise<User>{
        return new Promise(async (resolve, reject) => {
            try {
                const db = await connection();
                const user = await db.collection('users').findOne({ email });
                if (!user) return resolve(null);
                resolve(user);
              } catch (err) {
                reject(err);
              }
        });
    }

    async save(user: User): Promise<User>{
        return new Promise(async (resolve, reject) => {
            try{
                const db = await connection();
                const result = await db.collection('users').insertOne(user);
                if (!result) return resolve(null);
        
                resolve(result.ops[0]);
            } catch (err) {
                reject(err);
            }
        });
    }
}