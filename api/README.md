**Iniciando o projeto
yarn init -y
yarn add express 
yarn add typescript ts-node-dev -D
yarn tsc --init

yarn add @types/express -D

yarn add uuidv4

yarn add nodemailer
yarn add @types/nodemailer
yarn add jest -D
yarn add @types/jest -D
yarn add ts-jest -D
yarn jest --init

jest.config.ts => collectCoverageFrom(configurar) => coverageReporters(cnfigurar) => testMatch: [
    "<rootDir>/src/**/*.spec.ts",
  ],   => transform: {
    '^.+\\.ts$': 'ts-jest'
  },

yarn add @shelf/jest-mongodb --dev

jest.config.ts => preset: "@shelf/jest-mongodb"