import frisby from 'frisby';
import { MongoClient } from 'mongodb';
import { uuid, isUuid } from 'uuidv4';


const url = 'http://localhost:3000';
const mongoDbUrl = 'mongodb://localhost:27017/appjobs';
const dbName = 'appjobs';

describe('1. Cadastro de usuário', () => {
    let connection;
    let db;
    beforeAll(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        db = await connection.db(dbName);
      });

      beforeEach(async () => {
        await db.collection('users').deleteMany({});
        const users = {
          name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
        await db.collection('users').insertOne(users);
      });
    
      afterAll(async () => {
        await db.collection('users').deleteMany({});
        await connection.close();
        await db.close();
      });

      it('É possível inserir um usuário', async () => {
        await frisby.post(`${url}/api/users`, {
            id: uuid(),
            name: 'user test',
            email: 'user@test.com',
            nascimento: new Date('10/01/2000'),
            password: '123456',
            type: 'candidate'
        }).expect('status', 201).then(response => {
            const { body } = response;
            const result = JSON.parse(body);
            expect(isUuid(result.user.id)).toBe(true);
            expect(result.user.name).toBe('user test');
            expect(result.user.email).toBe('user@test.com');
            expect(result.user.type).toBe('candidate');
        })
      })
})

