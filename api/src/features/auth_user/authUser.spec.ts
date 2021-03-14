import frisby from "frisby";
import { MongoClient } from "mongodb";
import { uuid, isUuid } from "uuidv4";

const url = "http://localhost:3000";
const mongoDbUrl = "mongodb://localhost:27017/appjobs";
const dbName = "appjobs";

describe("1. Autenticação do usuário", () => {
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
    // await db.collection("users").deleteMany({});
    const users = {
      name: "admin",
      email: "root@email.com",
      password: "admin",
      role: "admin",
    };
    await db.collection("users").insertOne(users);
  });

  afterAll(async () => {
    await db.collection("users").deleteMany({});
    await connection.close();
    await db.close();
  });

  it("campo email é obrigatório", async () => {
    await frisby
      .post(`${url}/api/login`, {
        email: "",
        password: "1234356",
      })
      .expect("status", 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe("All fields must be filled.");
      });
  });

  it("campo senha é obrigatório", async () => {
    await frisby
      .post(`${url}/api/login`, {
        email: "user@test.com",
        password: "",
      })
      .expect("status", 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe("All fields must be filled.");
      });
  });

  it("Não é possível fazer login com email inválido", async () => {
    await frisby
      .post(`${url}/api/login`, {
        email: "user@test.c",
        password: "123456",
      })
      .expect("status", 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe("Invalid credentials, try again");
      });
  });

  it("Não é possível fazer login com senha inválida", async () => {
    await frisby
      .post(`${url}/api/login`, {
        email: "user@test.com",
        password: "1236",
      })
      .expect("status", 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe("Invalid credentials, try again");
      });
  });

  it("Será validado que é possível fazer login com sucesso", async () => {
    await frisby
      .post(`${url}/api/users/`, {
        name: "user test",
        email: "user@test.com",
        birthdate: new Date("10/01/2000"),
        password: "123456",
        type: "candidate",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .post(`${url}/api/login`, {
            email: result.user.email,
            password: "123456",
          })
          .expect("status", 200)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.token).not.toBeNull();
          });
      });
  });
});
