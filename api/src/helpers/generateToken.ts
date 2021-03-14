import jwt from "jsonwebtoken";

const secret = "2904375irofjejjhnhbtrkmkbgjhio";

const generateToken = async (userData) => {
  const jwtConfig = {
    expiresIn: "15m",
    algorithm: "HS256",
  };
  const token = jwt.sign({ data: userData }, secret, jwtConfig);

  return token;
};

export { generateToken };
