import frisby from "frisby";
import { MongoClient } from "mongodb";
import { uuid, isUuid } from "uuidv4";

const url = "http://localhost:3000";
const mongoDbUrl = "mongodb://localhost:27017/appjobs";
const dbName = "appjobs";

describe("1. Alteração de cadastro de usuário", () => {
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
    await db.collection("users").deleteMany({});
    const users = [{
      name: "admin",
      email: "root@email.com",
      password: "admin",
      role: "admin",
    }, {name: "user test",
    email: "user@test.com",
    birthdate: new Date("09/17/1963"),
    password: "123456",
    type: "candidate"}];
    await db.collection("users").insertMany(users);
  });

  afterAll(async () => {
    await db.collection("users").deleteMany({});
    await connection.close();
    await db.close();
  });

  it("Não é possivel editar um cadastro sem estar autenticado", async () => {
    await frisby
      .post(`${url}/api/users`, {
        name: "user test",
        email: "user@test.com.br",
        birthdate: new Date("09/17/1963"),
        password: "123456",
        type: "candidate",
      })
      .expect("status", 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .put(`${url}/api/users/${result.user.id}`, {
            name: "user test",
            email: "user@test.com.br",
            birthdate: new Date("09/17/1963"),
            password: "12345678",
            type: "candidate",
          })
          .expect("status", 400)
          .then((editResponse) => {
            const { body } = editResponse;
            const editResult = JSON.parse(body);
            expect(editResult.message).toBe("Missing auth token");
          });
      });
  });
});
